import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "../login.service";
import {Router} from "@angular/router";
import {ToasterService} from "../../shared/toasts/toaster.service";
import {LoginResponseInterface} from "../interface/login-response.interface";
import {HttpErrorResponse} from "@angular/common/http";

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

                next: (res) => this.handleSuccessLogin(res),

                error: (err) => this.handleErrorLogin(err)
            })
    }

    handleSuccessLogin(res: LoginResponseInterface) {
        if (res.token) this.router.navigate(['/user'])
        this.isLoading = false;
    }

    handleErrorLogin(err: HttpErrorResponse) {
        this.isLoading = false;
        this.toasterService.show(err.error.error, {className: 'bg-danger text-light'})
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
