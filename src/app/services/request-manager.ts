import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlConfig } from '../url.config';

//This is the service used for handling Http requests to be connected with the backend

@Injectable({
  providedIn: 'root'
})
export class RequestManager {


 // private apiUrl = 'http://localhost:8080/api';
 private apiUrl=UrlConfig.apiUrl;

  constructor(private http: HttpClient) { }

 
 
  //Send room searching criteria and get results
  sendSearchData(searchData: any): Observable<any> {
    //const token = localStorage.getItem('token');
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${this.apiUrl}/v1/search`;
    return this.http.post<any>(url, searchData);
  }

//Send room searching criteria and get results by low price basis
  sendSearchDataPriceBased(searchData: any): Observable<any> {
    //const token = localStorage.getItem('token');
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${this.apiUrl}/v1/search/priceBased`;
    return this.http.post<any>(url, searchData);
  }

  sendReservData(formdata:any): Observable<any> {
    

    const url = `${this.apiUrl}/v1/reservations/place`;
    return this.http.post<any>(url, formdata);
  }


  

}
