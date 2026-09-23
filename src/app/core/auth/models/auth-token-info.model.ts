import jwtDecode, { JwtPayload } from 'jwt-decode';

export const TOKENITEM = 'dsAuthInfo';

export class AuthTokenInfo {
  public accessToken: string;
  public expires: number;
  public authenticationMethod?: string;

  constructor(token: string) {
    this.accessToken = token.replace('Bearer ', '');
    try {
      const tokenClaims = jwtDecode<JwtPayload & { authenticationMethod?: string }>(this.accessToken);
      // exp claim is in seconds, convert it se to milliseconds
      this.expires = tokenClaims.exp * 1000;
      this.authenticationMethod = tokenClaims.authenticationMethod;
    } catch (err) {
      this.expires = 0;
    }
  }
}
