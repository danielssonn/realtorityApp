import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Social } from './social';
import { SocialLinkService } from './social-link.service';

export class SocialLinksDataSource implements DataSource<Social> {

    private socialLinksSubject = new BehaviorSubject<Social[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    private socialCount;
    displayedColumns = ['network', 'status'];


    constructor(private clientManagerService: SocialLinkService) { }

    connect(collectionViewer: CollectionViewer): Observable<Social[]> {
        return this.socialLinksSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.socialLinksSubject.complete();
        this.loadingSubject.complete();
    }

    loadSocialLinks(salespersonId: string, filter: string, sortOn: string,
        sortDirection = 'asc', pageIndex = 0, pageSize = 10) {

        this.loadingSubject.next(true);

        this.clientManagerService.getSocialLinks(filter,sortDirection, sortOn,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(socialLinks => {
               if(socialLinks[0]){
                this.socialCount = socialLinks[0].outOf;
                return this.socialLinksSubject.next(socialLinks.splice(1, socialLinks.length ));
               } 
            
            });
    }
}
