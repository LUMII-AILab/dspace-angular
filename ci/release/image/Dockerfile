# Adapted from the pinned frontend Dockerfile.dist; inputs have no moving defaults.
# The frontend named context is a verified Git archive of the full reviewed SHA,
# prepared without submodules by scripts/frontend_image.py prepare-source.
ARG NODE_IMAGE
FROM ${NODE_IMAGE} AS build
ARG APK_PACKAGES
ARG NODE_VERSION
ARG YARN_VERSION
ARG SOURCE_PACKAGE_SHA256
ARG SOURCE_LOCK_SHA256
ARG UPSTREAM_DOCKERFILE_SHA256
ARG BUILDKIT_SBOM_SCAN_STAGE=true
RUN test "$(node --version)" = "v${NODE_VERSION}" \
    && test "$(yarn --version)" = "${YARN_VERSION}" \
    && apk add --no-cache ${APK_PACKAGES}
WORKDIR /app
COPY --from=frontend /package.json /yarn.lock /Dockerfile.dist ./
RUN printf '%s  %s\n' "${SOURCE_PACKAGE_SHA256}" package.json \
    "${SOURCE_LOCK_SHA256}" yarn.lock \
    "${UPSTREAM_DOCKERFILE_SHA256}" Dockerfile.dist | sha256sum -c - \
    && yarn install --frozen-lockfile --non-interactive --network-timeout 300000
COPY --from=frontend / /app/
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN yarn test:server-config && yarn build:prod \
    && printf '%s  %s\n' "${SOURCE_LOCK_SHA256}" yarn.lock | sha256sum -c -
RUN mkdir /build-evidence \
    && apk info -v | sort > /build-evidence/apk-packages.txt \
    && node --version > /build-evidence/node-version.txt \
    && yarn --version > /build-evidence/yarn-version.txt

ARG NODE_IMAGE
FROM ${NODE_IMAGE} AS process-manager
WORKDIR /opt/pm2
COPY pm2/package.json pm2/package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts --no-audit --no-fund

ARG NODE_IMAGE
FROM ${NODE_IMAGE} AS runtime
ARG SOURCE_REVISION
ARG OPS_REVISION
LABEL org.opencontainers.image.source="https://github.com/LUMII-AILab/dspace-angular" \
    org.opencontainers.image.revision="${SOURCE_REVISION}" \
    org.opencontainers.image.title="CLARIN DSpace frontend release" \
    lv.clarin.frontend.source="https://github.com/LUMII-AILab/dspace-angular" \
    lv.clarin.ops.revision="${OPS_REVISION}"
COPY --from=process-manager /opt/pm2 /opt/pm2
RUN ln -s /opt/pm2/node_modules/.bin/pm2-runtime /usr/local/bin/pm2-runtime
COPY --chown=1000:1000 --from=build /app/dist /app/dist
COPY --chown=1000:1000 --from=frontend /config/config.yml /app/config/config.yml
COPY --chown=1000:1000 dspace-ui.json /app/dspace-ui.json
COPY --from=build /build-evidence /usr/share/clarin-build
COPY inputs.json /usr/share/clarin-build/inputs.json
WORKDIR /app
USER 1000:1000
ENV NODE_ENV=production
EXPOSE 4000
CMD ["pm2-runtime", "start", "/app/dspace-ui.json", "--json"]
