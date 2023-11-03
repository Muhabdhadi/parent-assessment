import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {UsersListResponseInterface} from "./interfaces/users-list-response.interface";
import {UserInterface} from "./user.interface";
import {ToasterService} from "../../shared/toasts/toaster.service";
import {ConfirmationUserModalComponent} from "../confirmation-user-modal/confirmation-user-modal.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {UpdateUserComponent} from "../update-user/update-user.component";
import {UpdateUserInterface} from "../update-user/update-user.interface";

@Component({
    selector: 'app-user',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
    page = 1;
    per_page = 6;
    users: UserInterface[] = []
    totalUsers = 0;
    isLoading = false
    isUserDetailsVisible = false;
    selectedUser: UserInterface | null = null;
    confirmationModalRef!: NgbModalRef;
    updateUserComponentRef!: NgbModalRef;
    constructor(private userService: UserService,
                private modalService: NgbModal,
                private toasterService: ToasterService) {
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
            next: () => {
                this.toasterService.show(`User have been deleted successfully`, {className: 'bg-success text-light'});
                this.confirmationModalRef.close();
                this.removeDeletedUserFormArray(userId);
            },
            error: () => {
                this.toasterService.show(`Error while deleting the user`, {className: 'bg-danger text-light'})
            }
        });
    }

    updateUser(userId: string | number, userUpdatePayload: UpdateUserInterface) {
        this.userService.updateUser(userId, userUpdatePayload).subscribe({
            next: () => {
                this.updateUserComponentRef.close();
                this.toasterService.show('User Updated Successfully', {className: 'bg-success text-light'});
            },
            error: () => {
                this.toasterService.show('Error while Update User',  {className: 'bg-danger text-light'});
            }
        })
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

        this.confirmationModalRef.componentInstance.name = user.first_name + ' ' + user.last_name

        this.confirmationModalRef.componentInstance.confirm.subscribe({
            next: (isConfirm: boolean) => {
                if (isConfirm) {
                    this.deleteUser(user.id);
                }

                if (!isConfirm) {
                    this.confirmationModalRef.close();
                }
            }
        });

    }

    onUpdateUser(user?: UserInterface) {

        this.updateUserComponentRef = this.modalService.open(UpdateUserComponent, {size: 'md', centered: true, modalDialogClass: 'modal-update'});

        this.updateUserComponentRef.componentInstance.user = user;


        this.updateUserComponentRef.componentInstance.cancel.subscribe({
            next: () => this.handleCancelUpdateUserModal()
        });

        this.updateUserComponentRef.componentInstance.save.subscribe({
            next: (updatedUserInfo: any) => this.handleUpdateUser(user, updatedUserInfo)
        })
    }

    handleCancelUpdateUserModal() {
        this.updateUserComponentRef.close();
    }

    handleUpdateUser(user: UserInterface | undefined, userUpdatedInfo: UpdateUserInterface) {
        if (user) {
            this.updateUser(user?.id, userUpdatedInfo);
        }
    }
}
