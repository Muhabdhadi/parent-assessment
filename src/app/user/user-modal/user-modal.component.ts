import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserInterface} from "../users-list/interfaces/user.interface";
import {UserModalService} from "./user-modal.service";
import {UpdateUserInterface} from "./interfaces/update-user.interface";
import {ToasterService} from "../../shared/toasts/toaster.service";

@Component({
    selector: 'app-update-user',
    templateUrl: './user-modal.component.html',
    styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements  OnInit {
    @Input() user: UserInterface | null = null;
    @Output() cancel = new EventEmitter();

    updateForm = this.fb.group({
        name: ['', Validators.required],
        job: ['', Validators.required]
    });
    constructor(private fb: FormBuilder,
                private userModalService: UserModalService,
                private toasterService: ToasterService) {
    }

    ngOnInit() {
        if (this.user) {
            this.updateForm.get('name')?.setValue(this.user?.first_name + ' ' + this.user.last_name);
            this.updateForm.updateValueAndValidity();
        }
    }

    onCancel() {
        this.cancel.emit();
    }

    onSave() {
        this.validateLoginForm();

        if (this.updateForm.invalid) { return; }

        // @ts-ignore
        this.updateUser(this.user?.id, this.updateForm.value);
    }

    validateLoginForm() {
        Object.values(this.updateForm.controls).forEach(control => {
            if (control.invalid) {
                control.markAsTouched();
                control.updateValueAndValidity({ onlySelf: true });
            }
        });
    }

    onAddNewUser() {
        this.validateLoginForm();

        if (this.updateForm.invalid) { return; }

        // this.newUser.emit(this.updateForm.value);
    }

    updateUser(userId: string | number, userUpdatePayload: UpdateUserInterface) {
        this.userModalService.updateUser(userId, userUpdatePayload).subscribe({
            next: () => {
                this.userModalService.updatedUser = userUpdatePayload;
                this.toasterService.show('User Updated Successfully', {className: 'bg-success text-light'});
            },
            error: () => {
                this.toasterService.show('Error while Update User',  {className: 'bg-danger text-light'});
            }
        })
    }
}
