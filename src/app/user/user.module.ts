import {NgModule} from "@angular/core";
import {UsersListComponent} from "./users-list/users-list.component";
import {UserRoutingModule} from "./user.routing.module";
import {CommonModule} from "@angular/common";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {UserDetailsComponent} from "./user-details/user-details.component";

@NgModule({
    declarations: [
        UsersListComponent,
        UserDetailsComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        InfiniteScrollModule
    ]
})
export class UserModule {

}
