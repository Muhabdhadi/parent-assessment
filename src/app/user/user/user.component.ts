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
    page = 1;
    per_page = 5;
    users: UserInterface[] = []
    totalUsers = 0;
    isLoading = false
    isUserDetailsVisible = false;
    selectedUser: UserInterface | null = null;
    constructor(private userService: UserService, private toasterService: ToasterService) {
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.userService.getUsers({page: this.page, per_page: this.per_page})
            .subscribe({
            next: (res) => this.handleUsersSuccess(res),

            error: () => this.handleUsersError(),
        });
    }

    handleUsersSuccess(res: UsersResponseInterface) {
        this.totalUsers = res.total;
        this.users.push(...res.data);
        this.isLoading = false;
    }

    handleUsersError() {
        this.isLoading = false;
        this.toasterService.show('Error while getting users', {
            className: 'bg-danger text-light'
        });
    }

    onScroll() {
        if (this.totalUsers === this.users.length) { return; }
        this.isLoading = true;
        this.page+=1;
        this.getUsers();
    }

    onGetUserById(user: UserInterface) {
        this.getUserById(user.id);
    }

    closeUserDetails() {
        this.isUserDetailsVisible = false;
        this.selectedUser = null;
    }

    getUserById(userId: string | number) {
        this.userService.getUserById(userId).subscribe({
            next: (user) => {
                this.selectedUser = user.data;
                this.isUserDetailsVisible = true;
            }
        })
    }
}
