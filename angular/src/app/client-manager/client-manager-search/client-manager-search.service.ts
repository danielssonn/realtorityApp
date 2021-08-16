import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Client } from './client';
import { Agent } from './agent';
import { ClientManager } from './clientManager';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { of as observableOf, Subject } from 'rxjs';
import { PropertiesService } from 'app/properties.service';

@Injectable({
  providedIn: 'root'
})



export class ClientManagerSearchService {
  clientsForSalesperson: string;
  myActiveClient: string;
  workingOnBehalfClient: Client;
  salesPersonUrl
  clientManager: ClientManager;
  activeClient: any;


  recommendUrl;

  private clientManagerSubject = new Subject<any>();


  constructor(private http: HttpClient, private propertiesService: PropertiesService) {
    this.clientsForSalesperson = environment.serverURL + '/clientManager';
    this.myActiveClient = environment.serverURL + '/myActiveClient';
    this.salesPersonUrl = environment.serverURL + '/mySalesperson';
    this.recommendUrl = environment.serverURL + '/recommendation';
    this.clientManager = { client: null, agent: null };
  }

  setup() {
    
    this.getActiveSalesperson().subscribe();
    this.getActiveClient().subscribe();
  }

  clientManagerBuilder(): Observable<any> {
    return this.clientManagerSubject.asObservable();
  }


  getClients(filter = '', activity: string, days:string, segment:string,
    pageNumber = 0, pageSize = 3 ): Observable<Client[]> {

    return this.http.get(this.clientsForSalesperson, {
      params: new HttpParams()
        .set('filter', filter)
        .set('activity', activity)
        .set('days', days)
        .set('segment', segment)
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

  setActiveClient(user) {
    console.log("active user set", user)
    return this.http.post(this.myActiveClient, JSON.stringify(user)).pipe(map(response => {
      this.propertiesService.clearCachedProperties();
      this.propertiesService.clearUserPreferences();
      this.workingOnBehalfClient = user;
      this.activeClient = true;
      this.clientManager.client = { userId: user.userId, name: user.name, email: user.email, phone: user.phone, firstName: user.firstName }
      this.clientManagerSubject.next(this.clientManager);
    }))
  }

  reset() {
    this.activeClient = false;
    this.clientManager.client = { userId: '-1', name: '', email: '', phone: '', firstName:'' }
    this.clientManagerSubject.next(this.clientManager);
  }

  getActiveClient(): Observable<any> {
    if(this.activeClient && this.activeClient.userId){
      return observableOf(this.clientManager.client);
    } else{
      return this.http.get(this.myActiveClient).pipe(map(response => {
        this.propertiesService.clearCachedProperties();
        this.propertiesService.clearUserPreferences();
        const client = response as Client;
      
        this.clientManager.client = { name: client.name, email: client.email, userId: client.userId, phone: client.phone, firstName: client.firstName };
        
          this.clientManagerSubject.next(this.clientManager);
         
          this.activeClient = this.clientManager.client;
          return this.clientManager.client;
          
      }))
    }


  }
  getActiveSalesperson(): Observable<any> {
    return this.http.get(this.salesPersonUrl).pipe(map(response => {
      const agent = response[0] as Agent;
      if (agent) {
        this.clientManager.agent = { name: agent.name, email: agent.email, userId: agent.userId, phone: agent.phone };
        return this.clientManager.agent;
      } else {
        return null;
      }


    }))

  }

  getCurrentClientManager(): ClientManager {

    return this.clientManager;

  }

  recommend(mlsNum): Observable<any> {
    return this.http.post(this.recommendUrl, { mlNum: mlsNum }).pipe(map(response => {
      console.log('RR',response)
      return response;
            
    }))
  }



}
