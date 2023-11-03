import {UserInterface} from "./user.interface";

export interface UserResponseInterface {
    data: UserInterface,
    support: {
        text: string,
        url: string
    }
}
