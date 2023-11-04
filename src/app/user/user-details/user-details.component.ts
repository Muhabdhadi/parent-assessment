import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {UserInterface} from "../users-list/interfaces/user.interface";
import {UserDetailsService} from "./user-details.service";

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnChanges {
    @Input() user: UserInterface | null = null;
    @Output() close: EventEmitter<void> = new EventEmitter();
    @Output() edit: EventEmitter<UserInterface> = new EventEmitter();
    @Output() delete: EventEmitter<UserInterface> = new EventEmitter();

    constructor(private userDetailsService: UserDetailsService) {}

    ngOnChanges(changes: SimpleChanges) {
        const userChange = changes['user'];
        const userIdCurrentChange = userChange.currentValue?.id
        const userIdPrevChange = userChange.previousValue?.id

        if (userChange.firstChange && this.user) {

            this.getUserById(this.user?.id);

        } else  {

            if( userIdPrevChange !== userIdCurrentChange && this.user) {
                this.getUserById(this.user?.id);
            }

        }





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

    getUserById(userId: string | number) {
        this.userDetailsService.getUserById(userId).subscribe({
            next: (user) => {
                this.user = user.data;
            }
        })
    }
}
