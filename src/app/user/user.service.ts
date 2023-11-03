import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Utilities} from "../shared/utilities";
import {Observable} from "rxjs";
import {UsersResponseInterface} from "./user/users-response.interface";
import {UserInterface} from "./user/user.interface";
import {UserResponseInterface} from "./user/user-response.interface";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    reqresBaseUrl = environment.reqres;
    constructor(private http: HttpClient) {}

    getUsers(params: {}): Observable<UsersResponseInterface> {
        const param = Utilities.addParams(params);
        return this.http.get<UsersResponseInterface>(`${this.reqresBaseUrl}users`, {
            params: param
        });
    }

    getUserById(userId: string | number): Observable<UserResponseInterface> {
        return this.http.get<UserResponseInterface>(`${this.reqresBaseUrl}users/${userId}`);
    }
}
