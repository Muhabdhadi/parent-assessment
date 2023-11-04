import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfirmationUserModalService} from "./confirmation-user-modal.service";
import {UserInterface} from "../users-list/interfaces/user.interface";
import {ToasterService} from "../../shared/toasts/toaster.service";

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-user-modal.component.html',
    styleUrls: ['./confirmation-user-modal.component.scss']
})
export class ConfirmationUserModalComponent {
    @Output() close: EventEmitter<any> = new EventEmitter();
    @Input() user: UserInterface | null = null;

    constructor(private confirmationUserModal: ConfirmationUserModalService,
                private toasterService: ToasterService) {}
    closeModal() {
        this.close.emit();
    }

    confirmDelete() {
        if(this.user) {
            this.deleteUser(this.user);
        }

    }

    deleteUser(user: UserInterface) {
        this.confirmationUserModal.deleteUser(user.id).subscribe({
            next: () => {
                this.toasterService.show(`User have been deleted successfully`, {className: 'bg-success text-light'});
                this.closeModal();
                this.confirmationUserModal.deletedUser = user;
            },
            error: () => {
                this.toasterService.show(`Error while deleting the user`, {className: 'bg-danger text-light'})
            }
        });
    }

}
