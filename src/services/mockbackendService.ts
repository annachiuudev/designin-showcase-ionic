
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';


@Injectable()
export class MockBackendService {



    constructor(private http: HttpClient) {
    }


    getCall(api, arg?) {
        var url = `./assets/json/mock-${api}.json`;
        return new Promise((resolve, reject) => {

            this.http.get(url, arg).subscribe(res => {
                resolve(res);
            })
           
        })
    }

    postCall(api, payload) {
        return new Promise(resolve => {
            resolve('OK'); 
        })
    }

    async loginAuth() {
       return await this.getCall('current-user')
    }

}
