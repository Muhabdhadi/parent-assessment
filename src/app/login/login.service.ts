import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable, Subject, tap} from "rxjs";
import {LoginResponseInterface} from "./interface/login-response.interface";
import { User } from "./models/user";
import {LoginInterface} from "./interface/login.interface";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    reqresBaseUrl = environment.reqres;
    private user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    constructor(private http: HttpClient, private router: Router) {}

    get user(): Observable<User | null> {
        return this.user$.asObservable();
    }

    login(loginPayload: LoginInterface): Observable<LoginResponseInterface> {
        return this.http.post<LoginResponseInterface>(`${this.reqresBaseUrl}login`, loginPayload)
            .pipe(
                tap((res) => {
                    localStorage.setItem('token', res.token);
                    this.user$.next(new User(res.token));
                    this.router.navigate(['/user'])
                })
            )
    }

    logout() {
        localStorage.clear();
        this.user$.next(null);
        this.router.navigate(['/login'])
    }
}
