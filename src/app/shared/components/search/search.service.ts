import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const URL="http://182.18.157.79/medv/api/drug/"

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http:HttpClient) { 

  }

  searchMedicin(searchText:string):Observable<any>{
    return this.http.get(`${URL}\serDrug?drugName=${searchText}`);
  }
}
