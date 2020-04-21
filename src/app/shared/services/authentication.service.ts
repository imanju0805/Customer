import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { StorageService } from './storage.service';
const TOKEN_KEY = 'user-access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: Observable<any>;
  private authState = new BehaviorSubject(null);
  authenticationState = new BehaviorSubject(false);
  server = 'http://182.18.157.79/medv/api/customer/validateCredential';
  constructor(public httpClient: Http, private storage: Storage, private storageService: StorageService, private router: Router, private plt: Platform) {
    this.plt.ready().then(() => { 
      this.checkToken();
    });

    this.loadUser();
    this.user = this.authState.asObservable().pipe(
      filter(response => response)

    );
  }

  postData(body) {
    let type = "application/json; charset=UTF-8";
    let headers = new Headers({ 'Content-Type': type });
    let options = new RequestOptions({ headers: headers });

    return this.httpClient.post(this.server, JSON.stringify(body), options);
  }

  custoRegister(body): Observable<any>{
    let type = "application/json; charset=UTF-8";
    let headers = new Headers({ 'Content-Type': type });
    let options = new RequestOptions({ headers: headers });
    return this.httpClient.post('http://182.18.157.79/medv/api/customer/SingUp_BasicInfo' ,body, options);
}
  loadUser() {
    this.storageService.getObject('userData').then(data => {
      if (data && data.userId && data.role) {
        this.authState.next(data);
      }
      else {
        this.authState.next({ userId: null, role: null });
      }
    })
  }



  checkToken() {

    this.storageService.getObject('userData').then(data => {
      if (data) {
        this.authenticationState.next(true);
      }

    })
  }



  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}
