import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Utilities} from "../shared/utilities";
import {Observable} from "rxjs";
import {UsersListResponseInterface} from "./users-list/interfaces/users-list-response.interface";

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

}
