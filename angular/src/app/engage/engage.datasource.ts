import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Engagement } from './engagement';
import { EngageService } from './engage.service';

export class EngageDataSource implements DataSource<Engagement> {

    private engagementSubject = new BehaviorSubject<Engagement[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    private engagementCount;

    constructor(private engageService: EngageService) { }

    connect(collectionViewer: CollectionViewer): Observable<Engagement[]> {
        return this.engagementSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.engagementSubject.complete();
        this.loadingSubject.complete();
    }

    loadClients(salespersonId: string, filter: string, sortOn: string,
        sortDirection = 'asc', pageIndex = 0, pageSize = 10) {

        this.loadingSubject.next(true);

        this.engageService.getEngagements(filter,sortDirection, sortOn,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(engagement => {
               if(engagement[0]){
                this.engagementCount = engagement[0].outOf;
                return this.engagementSubject.next(engagement.splice(1, engagement.length ));
               } 
            
            });
    }
}
