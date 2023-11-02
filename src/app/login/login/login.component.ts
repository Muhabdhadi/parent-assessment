import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "../login.service";
import {Router} from "@angular/router";
import {ToasterService} from "../../shared/toasts/toaster.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm = this.fb.group({
        email: [null, [Validators.required]],
        password: [null, [Validators.required]]
    })
    isLoading = false;

    constructor(private fb: FormBuilder,
                private router: Router,
                private toasterService: ToasterService,
                private loginService: LoginService) {
    }

    onLoginSubmit() {

        this.validateLoginForm();

        if (this.loginForm.invalid) { return; }

        this.login();
    }

    login() {
        this.isLoading = true;

        this.loginService.login(this.loginForm.value)
            .subscribe({

                next: (res) => {
                    if (res.token) this.router.navigate(['/user'])
                    this.isLoading = false;
                },

                error: (err) => {
                    this.isLoading = false;
                    this.toasterService.show(err.error.error, {className: 'bg-danger text-light'})
                }
            })
    }

    validateLoginForm() {
        Object.values(this.loginForm.controls).forEach(control => {
            if (control.invalid) {
                control.markAsTouched();
                control.updateValueAndValidity({ onlySelf: true });
            }
        });
    }
}
