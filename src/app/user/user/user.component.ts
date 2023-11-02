import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {UsersResponseInterface} from "./users-response.interface";
import {UserInterface} from "./user.interface";
import {ToasterService} from "../../shared/toasts/toaster.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    page = 0;
    per_page = 5;
    users: UserInterface[] = []

    constructor(private userService: UserService, private toasterService: ToasterService) {
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.userService.getUsers({page: this.page, per_page: this.per_page})
            .subscribe({
            next: (res) => this.handleUsersSuccess(res),

            error: () => this.handleUsersError()
        });
    }

    handleUsersSuccess(res: UsersResponseInterface) {
        this.users = res.data;
    }

    handleUsersError() {
        this.toasterService.show('Error while getting users', {
            className: 'bg-danger text-light'
        });
    }
}
