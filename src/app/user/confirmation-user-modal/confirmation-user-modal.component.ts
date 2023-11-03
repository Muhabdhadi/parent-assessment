import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-user-modal.component.html',
    styleUrls: ['./confirmation-user-modal.component.scss']
})
export class ConfirmationUserModalComponent {
    @Output() close = new EventEmitter();
    @Output() confirm: EventEmitter<boolean> = new EventEmitter();
    @Input() name = '';
    closeModal() {
        this.confirm.emit(false);
    }

    confirmDelete() {
        this.confirm.emit(true);
    }
}
