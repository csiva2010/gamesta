import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from './login/user';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError } from './http-error-handler.service';

import * as CryptoJS from 'crypto-js';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'        
  })
};

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private handleError: HandleError;
  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError('AppService');
   }  

  getUser(user: User) {
    try {
    console.log('password hash starts');    
    const emailHash = CryptoJS.MD5(user.email).toString();
    const passwordHash = CryptoJS.MD5(user.password).toString();
    console.log('password hash ends');
    const options = 
     { params: new HttpParams() } ;
     options.params.set('emailHash', emailHash);
     options.params.set('passwordHash', passwordHash);
    console.log('/gamesta/v1/api/auth call starts', options);
     this.http.get('http://localhost:8020/gamesta/v1/api/user', options)
      .subscribe (
        data => {
          console.log('Response from server ---> ', data);
          return data;
        }, error => {
          console.log(error);
        }
        
      );
     
      } catch(err) {
        console.log(err);
      }
    }

}
