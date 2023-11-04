import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../login/login.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isAuth = false;
    constructor(private loginService: LoginService) {}

    ngOnInit() {
        this.loginService.user.subscribe(isLoggedIn => {
            this.isAuth = !!isLoggedIn;
            console.log(this.isAuth);
        });
    }

    logout() {
        this.loginService.logout();
    }
}
