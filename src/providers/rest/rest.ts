import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export interface Table {
  title: string;
  description: string;
}
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  private apiUrl = 'http://localhost:8080/api/tables/';

  constructor(public http: HttpClient) {
    console.log('SERVICE RestProvider Provider');
  }
  getTable(): Observable<{}> {
    return this.http.get(this.apiUrl).
      catch(this.handleError);
  }

  createTable(table) {
    return this.http.post(this.apiUrl, table)
    .subscribe()
  }


  deleteTable(id) {
    return this.http.delete(this.apiUrl + id)
    .subscribe((res) => {
      console.log(res)
    })
  }

  login(user) {
    return this.http.post('http://localhost/api/login', user)
    .subscribe();
  }
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);

  }
}
