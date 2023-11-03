import {NgModule} from "@angular/core";
import {UsersListComponent} from "./users-list/users-list.component";
import {UserRoutingModule} from "./user.routing.module";
import {CommonModule} from "@angular/common";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {ConfirmationUserModalComponent} from "./confirmation-user-modal/confirmation-user-modal.component";
import {UpdateUserComponent} from "./update-user/update-user.component";

@NgModule({
    declarations: [
        UsersListComponent,
        UserDetailsComponent,
        ConfirmationUserModalComponent,
        UpdateUserComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        InfiniteScrollModule
    ]
})
export class UserModule {

}
