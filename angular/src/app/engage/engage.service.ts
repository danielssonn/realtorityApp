import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Engagement } from './engagement';


@Injectable({
  providedIn: 'root'
})
export class EngageService {

  constructor() { }

  getEngagements(filter = '', sortOrder = 'asc', sortOn: string,
  pageNumber = 0, pageSize = 3 ): Observable<Engagement[]> {
    return;
  }
}
