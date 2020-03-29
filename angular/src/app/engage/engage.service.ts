import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Engagement } from './engagement';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class EngageService {
  engagementsURL: string;

  constructor(private http: HttpClient) {

    this.engagementsURL = environment.serverURL + '/engagements';

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
}
