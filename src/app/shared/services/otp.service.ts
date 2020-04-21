import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http,Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(
    public httpClient: Http, private router: Router) {
    
}

createOtp(custid,otp) {

  let type = "application/json; charset=UTF-8";
  let headers = new Headers({ 'Content-Type': type });
  let options = new RequestOptions({ headers: headers });

  return this.httpClient.post('http://182.18.157.79/medv/api/customer/validateNewCustOTP?cutId='+custid+'&otp='+otp, options);
}
postData(id) {

  let type = "application/json; charset=UTF-8";
  let headers = new Headers({ 'Content-Type': type });
  let options = new RequestOptions({ headers: headers });

  return this.httpClient.post('http://182.18.157.79/medv/api/customer/SingUp_CreateOTP?mobNo='+id, options);
}
}