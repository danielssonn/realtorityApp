import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Channels } from './engagement-channel';
import { EngagementService } from '../engage.service';

export class SocialLinksDataSource implements DataSource<Channels> {

    private channelsSubject = new BehaviorSubject<Channels[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    public channelsCount;


    constructor(private channelService: EngagementService) { }

    connect(collectionViewer: CollectionViewer): Observable<Channels[]> {
        return this.channelsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.channelsSubject.complete();
        this.loadingSubject.complete();
    }

    loadNetworks(filter: string, sortOn: string,
        sortDirection = 'asc', pageIndex = 0, pageSize = 10) {

        this.loadingSubject.next(true);

        this.channelService.getNetworks(filter, sortDirection, sortOn,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(channels => {
                this.channelsCount = channels.length;
                return this.channelsSubject.next(channels);


            });
    }
}
