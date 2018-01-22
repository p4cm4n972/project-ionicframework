import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

let apiUrl = 'http://localhost:8080/api/'
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

  login(credentials) {
    return this.http.post(apiUrl + 'login', credentials).subscribe()
  }
  register(data) {
    return this.http.post(apiUrl + 'sign', data).subscribe();
  }
  logout() {
    return this.http.post(apiUrl + 'logout', {}).subscribe
  }

}
