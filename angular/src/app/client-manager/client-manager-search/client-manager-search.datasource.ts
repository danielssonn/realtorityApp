import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Client } from './client';
import { ClientManagerSearchService } from './client-manager-search.service';

export class ClientManagerSearchDataSource implements DataSource<Client> {

    private clientsSubject = new BehaviorSubject<Client[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    private clientCount;

    constructor(private clientManagerService: ClientManagerSearchService) { }

    connect(collectionViewer: CollectionViewer): Observable<Client[]> {
        return this.clientsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.clientsSubject.complete();
        this.loadingSubject.complete();
    }

    loadClients(filter: string, activity: string, days:string, segment:string,
        pageIndex = 0, pageSize = 10) {

        this.loadingSubject.next(true);

        this.clientManagerService.getClients(filter, activity, days, segment,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(client => {
               if(client[0]){
                this.clientCount = client[0].outOf;
                return this.clientsSubject.next(client.splice(1, client.length ));
               } 
            
            });
    }
}
