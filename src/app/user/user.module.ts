import {NgModule} from "@angular/core";
import {UserComponent} from "./user/user.component";
import {UserRoutingModule} from "./user.routing.module";
import {CommonModule} from "@angular/common";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@NgModule({
    declarations: [
        UserComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        InfiniteScrollModule
    ]
})
export class UserModule {

}
