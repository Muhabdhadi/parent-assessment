import {Injectable, TemplateRef} from "@angular/core";
import {ToasterOptionsInterface} from "./toaster-options.interface";

@Injectable({
    providedIn: 'root'
})
export class ToasterService {
    toasts: any[] = [];


    show(textOrTpl: string | TemplateRef<any>, options: ToasterOptionsInterface) {
        this.toasts.push({ textOrTpl, ...options });
    }

    remove(toast: any) {
        this.toasts = this.toasts.filter((t) => t !== toast);
    }

    clear() {
        this.toasts.splice(0, this.toasts.length);
    }
}
