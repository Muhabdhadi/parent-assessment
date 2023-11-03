import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {UsersListResponseInterface} from "./interfaces/users-list-response.interface";
import {UserInterface} from "./user.interface";
import {ToasterService} from "../../shared/toasts/toaster.service";

@Component({
    selector: 'app-user',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
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

    handleUsersSuccess(res: UsersListResponseInterface) {
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
        this.isUserDetailsVisible = true;
        this.getUserById(user.id);
    }

    getUserById(userId: string | number) {
        this.userService.getUserById(userId).subscribe({
            next: (user) => {
                this.selectedUser = user.data;
            }
        })
    }

    deleteUser(userId: string | number) {
        this.userService.deleteUser(userId).subscribe({
            next: (res) => {
                this.toasterService.show(`User have been deleted successfully`, {className: 'bg-success text-light'});
                this.removeDeletedUserFormArray(userId);
            },
            error: () => {
                this.toasterService.show(`Error while deleting the user`, {className: 'bg-danger text-light'})
            }
        });
    }

    removeDeletedUserFormArray(userId: number | string) {
        this.users.splice(this.users.findIndex(user => user.id === userId), 1);
        this.onCloseUserDetailsCard();
    }

    onCloseUserDetailsCard() {
        this.isUserDetailsVisible = false;
        this.selectedUser = null;
    }

    onDeleteUse(userId: number) {
        this.deleteUser(userId);
    }
}
