import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';


let apiUrl = 'http://localhost:8080/authentication/';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {}

  login(credentials) {
    console.log(credentials);
    return this.http.post(apiUrl + 'login', credentials.value)
    .subscribe( (data) => {
     console.log( data);
    });

  }
  register(data) {
    console.log(data);
    return this.http.post(apiUrl + 'sign', data).subscribe();
  }
  logout() {
    return this.http.post(apiUrl + 'logout', {}).subscribe
  }
  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return Observable.throw(err.message);
  }
}
