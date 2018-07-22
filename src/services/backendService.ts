
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';


@Injectable()
export class BackendService {



    constructor(private http: HttpClient) {
    }


    getCall(api, arg?) {
        let url = `${environment.backendPath}/${api}`

        return new Promise((resolve, reject) => {
            this.http.get(url, {params: arg}).subscribe(res => {
                // console.log(res);
                resolve(res);
            })
        })
    }

    postCall(api, payload) {
        let url = `${environment.backendPath}/${api}`
        return new Promise((resolve, reject) => {
            this.http.post(url, payload).subscribe(res => {
                console.log(res);
                resolve(res);
            })
        })
    }


}
