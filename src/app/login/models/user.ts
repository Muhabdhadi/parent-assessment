export class User {

    constructor(private readonly _token: string) {
        this._token = _token;
    }

    get token(): string {
        return this._token;
    }
}
