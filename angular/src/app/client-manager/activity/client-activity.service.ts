import { Injectable } from '@angular/core';
import { of as observableOf, Subject, Subscription } from 'rxjs';

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
  private clientSegmentsUrl;
  private activityDatesUrl;
  private options;


  private activityChangeSource = new Subject<string>();
  activityChangeAnnounced = this.activityChangeSource.asObservable();


  constructor(private http: HttpClient) {
    this.clientsCheckingUrl = environment.serverURL + '/clientsClicking';
    this.clientsTrackingUrl = environment.serverURL + '/clientsTracking';
    this.clientsSoldUrl = environment.serverURL + '/clientsTrackingSold';
    this.clientsEngagingUrl = environment.serverURL + '/clientsEngaging';
    this.clientSegmentsUrl = environment.serverURL + '/clientSegments';
    this.activityDatesUrl = environment.serverURL + '/activityDates';
    const headers = new Headers();
    this.options = new RequestOptions({ headers: headers, withCredentials: true });


  }

  announceActivity(activity: any) {
    this.activityChangeSource.next(activity);
  }

  getClientsClicking(days, segment): Observable<any> {
    let params = {
      days: days,
      segment: segment
    };



    this.options.params = params;
    if (days) {
      return this.http.get(this.clientsCheckingUrl, this.options).pipe(map(response => {
        return response;
      }))
    }

  }

  getClientsTracking(days, segment): Observable<any> {
    let params = {
      days: days,
      segment: segment
    };
    this.options.params = params;

 

    if (days) {
      return this.http.get(this.clientsTrackingUrl, this.options).pipe(map(response => {
        return response;
      }))
    }


  }
  getClientsSold(days, segment): Observable<any> {
    let params = {
      days: days,
      segment: segment
    };


    this.options.params = params;
    if (days) {
      return this.http.get(this.clientsSoldUrl, this.options).pipe(map(response => {
        return response;
      }))
    }
  }
  getClientsEngaging(days, segment): Observable<any> {
    let params = {
      days: days,
      segment: segment
    };

    
    if (days) {
      this.options.params = params;
      return this.http.get(this.clientsEngagingUrl, this.options).pipe(map(response => {
        return response;
      }))
    }
  }
  getClientSegments(): Observable<any> {
    return this.http.get(this.clientSegmentsUrl, this.options).pipe(map(response => {
      return response;
    }))
  }
  getActivityDates(): Observable<any> {
    return this.http.get(this.activityDatesUrl, this.options).pipe(map(response => {
      return response;
    }))
  }
}
