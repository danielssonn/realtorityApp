import { Injectable } from '@angular/core';
import { of as observableOf, Subscription } from 'rxjs';

import { map, reduce } from 'rxjs/operators';
import { RequestOptions, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http'

import { Observable } from 'rxjs/Rx';

@Injectable()
export class ClientActivityTrackingService {

  private clientsCheckingUrl;
  private clientsTrackingUrl;
  private clientsSoldUrl;
  private clientsEngagingUrl;
  private options;

  constructor(private http: HttpClient) {
    this.clientsCheckingUrl = environment.serverURL + '/clientsClicking';
    this.clientsTrackingUrl = environment.serverURL + '/clientsTracking';
    this.clientsSoldUrl = environment.serverURL + '/clientsTrackingSold';
    this.clientsEngagingUrl = environment.serverURL + '/clientsEngaging';

    const headers = new Headers();


    this.options = new RequestOptions({ headers: headers, withCredentials: true });


  }
  getClientsClicking(days): Observable<any> {
    let params = {
      days:days};
    this.options.params = params; 

    return this.http.get(this.clientsCheckingUrl, this.options).pipe(map(response => {
      return observableOf(response);
    }))

  }

  getClientsTracking(days): Observable<any> {
    let params = {
      days:days};
    this.options.params = params; 

    return this.http.get(this.clientsTrackingUrl, this.options).pipe(map(response => {
      return observableOf(response);
    }))

  }
  getClientsSold(days): Observable<any> {
    let params = {
      days:days};

    this.options.params = params; 
    return this.http.get(this.clientsSoldUrl, this.options).pipe(map(response => {
      return observableOf(response);
    }))

  }
  getClientsEngaging(days): Observable<any> {
    let params = {
      days:days};
    this.options.params = params; 
    return this.http.get(this.clientsEngagingUrl, this.options).pipe(map(response => {
      return observableOf(response);
    }))

  }
}
