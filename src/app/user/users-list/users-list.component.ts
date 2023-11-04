import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersListService} from "./users-list.service";
import {UsersListResponseInterface} from "./interfaces/users-list-response.interface";
import {UserInterface} from "./interfaces/user.interface";
import {ToasterService} from "../../shared/toasts/toaster.service";
import {ConfirmationUserModalComponent} from "../confirmation-user-modal/confirmation-user-modal.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {UserModalComponent} from "../user-modal/user-modal.component";
import {UserModalService} from "../user-modal/user-modal.service";
import {ConfirmationUserModalService} from "../confirmation-user-modal/confirmation-user-modal.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-user',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
    page = 1;
    per_page = 6;
    users: UserInterface[] = []
    totalUsers = 0;
    isLoading = false
    isUserDetailsVisible = false;
    selectedUser: UserInterface | null = null;
    confirmationModalRef!: NgbModalRef;
    userModalComponentRef!: NgbModalRef;
    newUserSubscription!: Subscription;
    deletedUserSubscription!: Subscription;
    updatedUserSubscription!: Subscription;
    constructor(private userService: UsersListService,
                private modalService: NgbModal,
                private userModalService: UserModalService,
                private userConfirmationModal: ConfirmationUserModalService,
                private toasterService: ToasterService) {
    }

    ngOnInit() {
        this.getUsers();

        this.updatedUserSubscription = this.userModalService.updatedUser.subscribe({
            next: (updatedUser) => {
                this.userModalComponentRef.close();
            }
        });

        this.deletedUserSubscription = this.userConfirmationModal.deletedUser.subscribe({
            next: (user: UserInterface) => {
                this.removeDeletedUserFormArray(user.id);
            }
        });

        this.newUserSubscription = this.userModalService.newUser.subscribe({
            next: (user) => {
                this.userModalComponentRef.close();
            }
        })
    }

    ngOnDestroy() {
        this.newUserSubscription.unsubscribe();
        this.deletedUserSubscription.unsubscribe();
        this.updatedUserSubscription.unsubscribe();
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
        this.selectedUser = user;
    }

    removeDeletedUserFormArray(userId: number | string) {
        this.users.splice(this.users.findIndex(user => user.id === userId), 1);
        this.onCloseUserDetailsCard();
    }

    onCloseUserDetailsCard() {
        this.isUserDetailsVisible = false;
        this.selectedUser = null;
    }

    onDeleteUse(user: UserInterface) {
        this.confirmationModalRef = this.modalService.open(ConfirmationUserModalComponent, {centered: true});

        this.confirmationModalRef.componentInstance.user = user

        this.confirmationModalRef.componentInstance.close.subscribe({
            next: () => {
                this.confirmationModalRef.close();
            }
        });

    }

    openAddNewUserModal() {
        this.userModalComponentRef = this.modalService.open(UserModalComponent, { centered: true });
        this.userModalComponentRef.componentInstance.cancel.subscribe({
            next: () => {
                this.userModalComponentRef.close();
            }
        })
    }

    onUpdateUser(user: UserInterface) {
        this.userModalComponentRef = this.modalService.open(UserModalComponent, {centered: true});
        this.userModalComponentRef.componentInstance.user = user;
        this.userModalComponentRef.componentInstance.cancel.subscribe({
            next: () => {
                this.userModalComponentRef.close();
            }
        });
    }
}
