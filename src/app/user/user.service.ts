import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Utilities} from "../shared/utilities";
import {Observable} from "rxjs";
import {UserResponseInterface} from "./users-list/interfaces/user-response.interface";
import {UsersListResponseInterface} from "./users-list/interfaces/users-list-response.interface";
import {UpdateUserInterface} from "./update-user/interfaces/update-user.interface";
import {UpdateUserResponseInterface} from "./update-user/interfaces/update-user-response.interface";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    reqresBaseUrl = environment.reqres;
    constructor(private http: HttpClient) {}

    getUsers(params: {}): Observable<UsersListResponseInterface> {
        const param = Utilities.addParams(params);
        return this.http.get<UsersListResponseInterface>(`${this.reqresBaseUrl}users`, {
            params: param
        });
    }

    getUserById(userId: string | number): Observable<UserResponseInterface> {
        return this.http.get<UserResponseInterface>(`${this.reqresBaseUrl}users/${userId}`);
    }

    deleteUser(userId: string | number): Observable<any> {
        return this.http.delete(`${this.reqresBaseUrl}users/${userId}`);
    }

    updateUser(userId: string | number, updateUserPayload: UpdateUserInterface): Observable<UpdateUserResponseInterface> {
        return this.http.put<UpdateUserResponseInterface>(`${this.reqresBaseUrl}users/${userId}`, updateUserPayload);
    }
}
