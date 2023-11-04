import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {environment} from "../../../environments/environment";
import {UserInterface} from "../users-list/interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class ConfirmationUserModalService {
    reqresBaseUrl = environment.reqres;

    private deletedUser$: Subject<UserInterface> = new Subject();

    set deletedUser(user: UserInterface) {
        this.deletedUser$.next(user);
    }

    get deletedUser(): Observable<UserInterface> {
        return this.deletedUser$.asObservable()
    }

    constructor(private http: HttpClient) {}

    deleteUser(userId: string | number): Observable<any> {
        return this.http.delete(`${this.reqresBaseUrl}users/${userId}`);
    }

}
