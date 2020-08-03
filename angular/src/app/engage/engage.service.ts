import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Engagement } from './engagement';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class EngagementService {
  engagementsURL: string;
  engagementChannelsURL: string;
  engagementNetworksURL: string;
  recurrenceURL: string;

  constructor(private http: HttpClient) {

    this.engagementsURL = environment.serverURL + '/engagements';
    this.engagementChannelsURL = environment.serverURL + '/channels';
    this.engagementNetworksURL = environment.serverURL + '/networks';
    this.recurrenceURL = environment.serverURL + '/recurrences';



  }

  getEngagements(filter = '', sortOrder = 'asc', sortOn: string,
    pageNumber = 0, pageSize = 3): Observable<Engagement[]> {
    return this.http.get(this.engagementsURL, {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('sortOn', sortOn)
      // tslint:disable-next-line:quotemark
    }).pipe(
      map(res => {
        res['payload'] = res;
        return res['payload'];
      })
    );;
  }

  removeEngagement(engagement): Observable<any>{
    console.log('removing engagegment', engagement)
    let httpParams = new HttpParams().set('engagementId', engagement);
    let options = { params: httpParams };
    
    return this.http.delete(this.engagementsURL, options).pipe(map(response => {
      
    }))

  }


  getNetworks(filter = '', sortOrder = 'asc', sortOn: string,
    pageNumber = 0, pageSize = 3 ): Observable<any> {

    return this.http.get(this.engagementNetworksURL, {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('sortOn', sortOn)
      // tslint:disable-next-line:quotemark
    }).pipe(
      map(res => {
        res['payload'] = res;
        return res['payload'];
      })
    );
  }

  getChannels(){

    return this.http.get(this.engagementChannelsURL).pipe(map(response => {
      return response;
    }))
    
  }

  getRecurrences(){

    return this.http.get(this.recurrenceURL).pipe(map(response => {
      return response;
    }))
    
  }

  setSocialLinks(links) {
    
    return this.http.post(this.engagementChannelsURL, JSON.stringify(links)).pipe(map(response => {
      
    }))
  }

  createEngagement(engagement):Observable<any> {

    console.log('creating engagement', engagement)
    return this.http.post(this.engagementsURL, engagement).pipe(map(response => {

      return response;
      
    }))
  }
}
