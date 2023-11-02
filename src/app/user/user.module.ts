import {NgModule} from "@angular/core";
import {UserComponent} from "./user/user.component";
import {UserRoutingModule} from "./user.routing.module";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        UserComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule
    ]
})
export class UserModule {

}
