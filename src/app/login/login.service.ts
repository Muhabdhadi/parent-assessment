import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, Subject, tap} from "rxjs";
import {LoginResponseInterface} from "./interface/login-response.interface";
import { User } from "./models/user";
import {LoginInterface} from "./interface/login.interface";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    reqresBaseUrl = environment.reqres;
    user$: Subject<User> = new Subject();
    constructor(private http: HttpClient) {}

    login(loginPayload: LoginInterface): Observable<LoginResponseInterface> {
        return this.http.post<LoginResponseInterface>(`${this.reqresBaseUrl}login`, loginPayload)
            .pipe(
                tap((res) => this.user$.next(new User(res.token)))
            )
    }
}
