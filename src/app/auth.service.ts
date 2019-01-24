import { Injectable } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import {User} from './login/user';
import { AppService } from './app.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  constructor(private appService: AppService) { }
  public login(user: User) {
    console.log('login started');
    if (user.email === null || user.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        console.log('calling get user REST API started');
        let data = this.appService.getUser(user);
        let access = false;
        console.log('calling get user REST API completed', user);
        if(data !== undefined) {
          access = true;
        }
        observer.next(access);
        observer.complete();
      });
    }
  }
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      console.log('Login successful');
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 

  public logout() {
    return Observable.create(observer => {      
      observer.next(true);
      observer.complete();
    });
  }
}
