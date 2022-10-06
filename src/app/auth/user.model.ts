export default class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string | null = null,
    private _tokenExpirationDate: Date | null = null
  ) {}

  get token() : string | null {
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) return null;

    return  this._token;
  }
}
