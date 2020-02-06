import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Listing } from './listing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientRecommendationService {

  listingsForClient: string;


  constructor(private http: HttpClient, ) {
    this.listingsForClient = environment.serverURL + '/myfavorites'
  }

  getListings(filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3): Observable<Listing[]> {

    return this.http.get(this.listingsForClient, {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
      // tslint:disable-next-line:quotemark
    }).pipe(
      map(res => {
        res['payload'] = res;
        return res['payload'];
      })
    );

  }
}
