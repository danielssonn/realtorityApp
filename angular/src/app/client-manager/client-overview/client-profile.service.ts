import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { ClientProfile } from './clientProfile';


@Injectable({
  providedIn: 'root'
})
export class ClientProfileService {
  clientProfileUrl: string;

  constructor(private http: HttpClient) {
    this.clientProfileUrl = environment.serverURL + '/clientProfile';
  }


  getClientProfile(clientId, salesPersonId): Observable<any> {
    return this.http.get(this.clientProfileUrl, {
      params: new HttpParams()
        .set('client', clientId)
        .set('salesPersonId', salesPersonId)
      // tslint:disable-next-line:quotemark
    }).pipe(map(response => {
      const clientProfile = response as ClientProfile;
      if (clientProfile) {
        // this.clientManager.agent = { name: agent.name, email: agent.email, userId: agent.userId, phone: agent.phone };
        console.log('Client profile is', clientProfile)
        return clientProfile;
      } else {
        return null;
      }


    }))

  }
}
