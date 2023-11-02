import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

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

                error: () => {
                    this.isLoading = false;
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
