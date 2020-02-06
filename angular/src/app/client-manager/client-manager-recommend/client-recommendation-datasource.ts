import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ClientRecommendationService } from './client-recommendation.service';
import { Listing } from './listing';



export class ClientRecommendationDataSource implements DataSource<Listing> {

    private listingSubject = new BehaviorSubject<Listing[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    public listingCount;

    constructor(private clientRecommendationService: ClientRecommendationService) {

     }

    connect(collectionViewer: CollectionViewer): Observable<Listing[]> {
        return this.listingSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.listingSubject.complete();
        this.loadingSubject.complete();
    }

    loadListings( filter = '',
        sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

        this.loadingSubject.next(true);

        this.clientRecommendationService.getListings(filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(listing => {
                if(listing[0].outOf){
                    this.listingCount = listing[0].outOf;
                    if(this.listingCount>0){
                        return this.listingSubject.next(listing.splice(1, listing.length ));
                    } 
    
                } else {
                   
                    return this.listingSubject.next([]);
                }
                
                
            });
    }
}
