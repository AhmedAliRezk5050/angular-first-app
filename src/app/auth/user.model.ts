export default class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string | null = null,
    private _tokenExpirationDate: Date | null = null,
  ) {}

  get token(): string | null {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
      return null;

    return this._token;
  }

  get tokenExpiryDuration() {
    if (!this._tokenExpirationDate) return 0;

    return this._tokenExpirationDate.getTime() - new Date().getTime();
  }
}

export interface UserCredentials {
  email: string;
  password: string;
}
