import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UpdateUserInterface} from "./interfaces/update-user.interface";
import {Observable, Subject} from "rxjs";
import {UpdateUserResponseInterface} from "./interfaces/update-user-response.interface";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
 export class UserModalService {
    reqresBaseUrl = environment.reqres;
    private updatedUser$ = new Subject();
    constructor(private http: HttpClient) {}
    
    set updatedUser(user: UpdateUserInterface) {
        this.updatedUser$.next(user);
    }
    
    get updatedUser(): Observable<any> {
        return this.updatedUser$.asObservable();
    }

    updateUser(userId: string | number, updateUserPayload: UpdateUserInterface): Observable<UpdateUserResponseInterface> {
        return this.http.put<UpdateUserResponseInterface>(`${this.reqresBaseUrl}users/${userId}`, updateUserPayload);
    }

}
