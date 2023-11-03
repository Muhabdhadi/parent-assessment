import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserInterface} from "../users-list/user.interface";

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
    @Input() user: UserInterface | null = null;
    @Output() close: EventEmitter<void> = new EventEmitter();
    @Output() edit: EventEmitter<number> = new EventEmitter();
    @Output() delete: EventEmitter<number> = new EventEmitter();

    onClose() {
        this.close.emit();
    }

    onUpdate(userId: number | undefined) {
        if (userId) {
            this.edit.emit(userId);
        }
    }

    onDelete(userId: number | undefined) {
        if (userId) {
            this.delete.emit(userId);
        }
    }
}
