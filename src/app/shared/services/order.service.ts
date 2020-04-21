import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private nativeHttp: Http) { }
  getCustOrders(id):Observable<any>{
    return this.nativeHttp.get('http://182.18.157.79/medv/api/order/getCustOrd?custId='+id);
  }
  getOrders(id): Observable<any> {
    return this.nativeHttp.get('http://182.18.157.79/medv//api/getInvListbyOrder?OrdId='+id+'&status=30');
  }
  getQuoteSubmit(id): Observable<any> {
    return this.nativeHttp.get('http://182.18.157.79/medv/api/order/ordById?Id=' + id);
  }
  getInvoiceById(id): Observable<any>{
    console.log("id=", id);
    return this.nativeHttp.get('http://182.18.157.79/medv/api/getInvById?id='+id);
  }
  getInvListbyOrder(id):Observable<any>{
    return this.nativeHttp.get('http://182.18.157.79/medv//api/getInvListbyOrder?OrdId='+id+'&status=30');
  }
  getPaidOrdListByCust(id):Observable<any>{
    return this.nativeHttp.get('http://182.18.157.79/medv/api/getPaidOrdListByCust?custId='+id);
  }
  getPrescriptionList(id):Observable<any>{
    return this.nativeHttp.get('http://182.18.157.79/medv/api/getPriscriptionList?OrderId='+id);
  }
  getPrescriptionImage(id,orderid):Observable<any>{
    return this.nativeHttp.get('http://182.18.157.79/medv/api/Image/getPriscriptionImage?OrderId='+id+'&imageName='+orderid);
  }
}
