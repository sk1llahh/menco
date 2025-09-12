import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  sub?: string;
  exp?: number;
  [key: string]: any;
}

const CONSTANT = {
  TOKEN: 'token',
};

export class SessionManager {
  private _token: string | null;
  private _session: JWTPayload | null;

  constructor() {
    this._token = localStorage.getItem(CONSTANT.TOKEN);
    this._session = this._token ? jwtDecode<JWTPayload>(this._token) : null;
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
  }

  get session(): JWTPayload | null {
    return this._session;
  }

  get token(): string | null {
    return this._token;
  }
}

export const sessionManager = new SessionManager();
