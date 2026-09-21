#!/usr/bin/env bash
# Publish only the successfully qualified OCI archive; never rebuild here.
set -euo pipefail
: "${GHCR_TOKEN:?}" "${GHCR_USER:?}" "${EXPECTED_DIGEST:?}" "${IMAGE:?}" "${TAG:?}"
test "$IMAGE" = ghcr.io/lumii-ailab/dspace-angular
[[ "$TAG" =~ ^sha-[a-f0-9]{40}$ ]]
[[ "$EXPECTED_DIGEST" =~ ^sha256:[a-f0-9]{64}$ ]]
python3 ci/release/frontend_image.py inspect output/frontend.oci.tar \
    "$EXPECTED_DIGEST" output/evidence
skopeo_image=$(jq -er .skopeo_image ci/release/image/inputs.json)
auth_dir=$(mktemp -d)
trap 'rm -rf -- "$auth_dir"' EXIT
chmod 700 "$auth_dir"
# This helper never mounts the Docker socket or target configuration.
skopeo() {
    local -a stdin_flags=()
    if [[ "$1" == login ]]; then
        stdin_flags=(-i)
    fi
    docker run "${stdin_flags[@]}" --rm --read-only --cap-drop ALL --security-opt no-new-privileges \
        --user "$(id -u):$(id -g)" --memory 512m --pids-limit 128 --tmpfs /tmp \
        -v "$auth_dir:/auth" -v "$PWD/output:/artifact:ro" \
        "$skopeo_image" --tmpdir /tmp "$@"
}
printf '%s' "$GHCR_TOKEN" | skopeo login --authfile /auth/auth.json \
    --username "$GHCR_USER" --password-stdin ghcr.io
unset GHCR_TOKEN
# A retry may finish an interrupted publication but must never move a release tag.
# Listing first distinguishes a missing tag from denied access/network errors.
tags=$(skopeo list-tags --authfile /auth/auth.json "docker://$IMAGE")
if jq -e --arg tag "$TAG" '.Tags | index($tag) != null' <<< "$tags" >/dev/null; then
    existing=$(skopeo inspect --raw --authfile /auth/auth.json "docker://$IMAGE:$TAG" | sha256sum | cut -d ' ' -f 1)
    test "sha256:$existing" = "$EXPECTED_DIGEST"
else
    skopeo copy --all --preserve-digests --authfile /auth/auth.json \
        oci-archive:/artifact/frontend.oci.tar "docker://$IMAGE:$TAG"
fi
remote_digest=$(skopeo inspect --raw --authfile /auth/auth.json "docker://$IMAGE:$TAG" \
    | sha256sum | cut -d ' ' -f 1)
test "sha256:$remote_digest" = "$EXPECTED_DIGEST"
