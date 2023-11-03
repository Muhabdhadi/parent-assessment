import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserInterface} from "../users-list/interfaces/user.interface";

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements  OnInit {
    @Input() user: UserInterface | null = null;
    @Output() cancel = new EventEmitter();
    @Output() save = new EventEmitter();

    updateForm = this.fb.group({
        name: ['', Validators.required],
        job: ['', Validators.required]
    })
    constructor(private fb: FormBuilder) {
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

        this.save.emit(this.updateForm.value);
    }

    validateLoginForm() {
        Object.values(this.updateForm.controls).forEach(control => {
            if (control.invalid) {
                control.markAsTouched();
                control.updateValueAndValidity({ onlySelf: true });
            }
        });
    }
}
