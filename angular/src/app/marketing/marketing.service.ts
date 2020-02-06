import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { of as observableOf, Subscription } from 'rxjs';
import { environment } from 'environments/environment';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MarketingService {
  private polygonList;
  private markersList;

  private polygonsUrl: string;
  private markersUrl: string;
  private options;

  constructor(private httpClient: HttpClient) { 
    this.polygonsUrl = environment.serverURL + '/marketingPolygons';
    this.markersUrl = environment.serverURL + '/marketingMarkers';
    const headers = new Headers();
    headers.append('Content-Type', 'x-application/json');
    this.options = new RequestOptions({ headers: headers, withCredentials: true });



  }

  getPolygons(key): Observable<any> {


      return this.httpClient.get(this.polygonsUrl, {
        params: new HttpParams().set('key', key)
      })

    

  }

  getMarkers(key): Observable<any> {
    return this.httpClient.get(this.markersUrl, {
      params: new HttpParams().set('key', key)
    })
  }

}
