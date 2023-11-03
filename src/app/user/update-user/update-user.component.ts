import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {
    @Input() avatar = ''
    @Output() cancel = new EventEmitter();
    @Output() save = new EventEmitter();

    updateForm = this.fb.group({
        name: ['', Validators.required],
        job: ['', Validators.required]
    })
    constructor(private fb: FormBuilder) {
    }

    onCancel() {
        this.cancel.emit();
    }

    onSave() {
        this.validateLoginForm();

        if (this.updateForm.invalid) { return; }

        this.save.emit();
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
