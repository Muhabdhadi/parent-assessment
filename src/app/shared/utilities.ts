import {HttpParams} from "@angular/common/http";

export class Utilities {
    public static addParams(params: {}) {

        let httpRequest = new HttpParams();

        for (const [key, value] of Object.entries(params)) {
            if (!value) { continue; }
            let valueString = '';
            if (typeof value !== 'string') {
                valueString = JSON.stringify(value);
                httpRequest = httpRequest.set(key, valueString);
            } else {
                httpRequest = httpRequest.set(key, value);
            }
        }
        return httpRequest;
    }
}
