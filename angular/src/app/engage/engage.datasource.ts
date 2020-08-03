import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Engagement } from './engagement';
import { EngagementService } from './engage.service';

export class EngageDataSource implements DataSource<Engagement> {

    private engagementSubject = new BehaviorSubject<Engagement[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    public engagementCount;

    constructor(private engageService: EngagementService) { }

    connect(collectionViewer: CollectionViewer): Observable<Engagement[]> {
        return this.engagementSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.engagementSubject.complete();
        this.loadingSubject.complete();
    }

    loadEngagements(filter: string, sortOn: string,
        sortDirection = 'asc', pageIndex = 0, pageSize = 10) {

        this.loadingSubject.next(true);

        this.engageService.getEngagements(filter,sortDirection, sortOn,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(engagement => {
              
                this.engagementCount = engagement.length;
                return this.engagementSubject.next(engagement);
               
            
            });
    }
}
