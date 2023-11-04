import {NgModule} from "@angular/core";
import {UsersListComponent} from "./users-list/users-list.component";
import {UserRoutingModule} from "./user.routing.module";
import {CommonModule} from "@angular/common";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {ConfirmationUserModalComponent} from "./confirmation-user-modal/confirmation-user-modal.component";
import {UserModalComponent} from "./user-modal/user-modal.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        UsersListComponent,
        UserDetailsComponent,
        ConfirmationUserModalComponent,
        UserModalComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        InfiniteScrollModule,
        ReactiveFormsModule
    ]
})
export class UserModule {

}
