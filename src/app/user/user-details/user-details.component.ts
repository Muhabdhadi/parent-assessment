import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserInterface} from "../users-list/user.interface";

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
    @Input() user: UserInterface | null = null;
    @Output() close: EventEmitter<any> = new EventEmitter();

    onClose() {
        this.close.emit();
    }
}
