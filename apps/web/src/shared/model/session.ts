import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  sub?: string;
  exp?: number;
  [key: string]: any;
}

const CONSTANT = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
};

export class SessionManager {
  private _token: string | null;
  private _session: JWTPayload | null;
  private _refreshToken: string | null;

  constructor() {
    this._token = localStorage.getItem(CONSTANT.TOKEN);
    this._session = this._token ? jwtDecode<JWTPayload>(this._token) : null;
    this._refreshToken = localStorage.getItem(CONSTANT.REFRESH_TOKEN);
  }

  login(value: string) {
    localStorage.setItem(CONSTANT.TOKEN, value);
    this._token = value;
    this._session = jwtDecode<JWTPayload>(value);
  }

  logout() {
    localStorage.removeItem(CONSTANT.TOKEN);
    this._token = null;
    this._session = null;
    localStorage.removeItem(CONSTANT.REFRESH_TOKEN);
    this._refreshToken = null;
  }

  get session(): JWTPayload | null {
    return this._session;
  }

  get token(): string | null {
    return this._token;
  }

  set refreshToken(value: string | null) {
    this._refreshToken = value;
    if (value) localStorage.setItem(CONSTANT.REFRESH_TOKEN, value);
    else localStorage.removeItem(CONSTANT.REFRESH_TOKEN);
  }

  get refreshToken(): string | null {
    return this._refreshToken;
  }

  isExpired(slopSeconds: number = 30): boolean {
    if (!this._session?.exp) return true;
    const nowSeconds = Math.floor(Date.now() / 1000);
    return this._session.exp - slopSeconds <= nowSeconds;
  }
}

export const sessionManager = new SessionManager();
