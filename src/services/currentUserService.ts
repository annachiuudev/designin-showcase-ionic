
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MockBackendService } from './mockbackendService';


@Injectable()
export class CurrentUserService {

    user: any;

    constructor(private backendService: MockBackendService) {
    }


    async onLogin() {
       this.user = await this.backendService.loginAuth();
    }


}
