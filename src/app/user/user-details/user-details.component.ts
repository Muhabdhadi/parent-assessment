import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserInterface} from "../users-list/interfaces/user.interface";

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
    @Input() user: UserInterface | null = null;
    @Output() close: EventEmitter<void> = new EventEmitter();
    @Output() edit: EventEmitter<UserInterface> = new EventEmitter();
    @Output() delete: EventEmitter<UserInterface> = new EventEmitter();

    constructor() {
    }
    onClose() {
        this.close.emit();
    }

    onUpdate(user: UserInterface | null) {
        if (user) {
            this.edit.emit(user);
        }
    }

    onDelete(user: UserInterface | null) {
        if (user) {
            this.delete.emit(user);
        }
    }
}
