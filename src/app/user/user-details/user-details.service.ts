import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserResponseInterface} from "../users-list/interfaces/user-response.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserDetailsService {
    reqresBaseUrl = environment.reqres;
    constructor(private http: HttpClient) {}

    getUserById(userId: string | number): Observable<UserResponseInterface> {
        return this.http.get<UserResponseInterface>(`${this.reqresBaseUrl}users/${userId}`);
    }
}
