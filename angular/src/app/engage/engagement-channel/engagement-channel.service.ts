import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Channels } from './engagement-channel';

import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { of as observableOf, Subject } from 'rxjs';
import { PropertiesService } from 'app/properties.service';

@Injectable({
  providedIn: 'root'
})



export class SocialLinkService {

  socialLinks: Channels;
  socialLinkURL: string;
 


  recommendUrl;

  private clientManagerSubject = new Subject<any>();


  constructor(private http: HttpClient, private propertiesService: PropertiesService) {
    this.socialLinkURL = environment.serverURL + '/channels';
  
    this.socialLinks
  }





  getChannels(filter = '', sortOrder = 'asc', sortOn: string,
    pageNumber = 0, pageSize = 3 ): Observable<Channels[]> {

    return this.http.get(this.socialLinkURL, {
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

  setSocialLinks(links) {
    
    return this.http.post(this.socialLinkURL, JSON.stringify(links)).pipe(map(response => {
      
    }))
  }

 


}
