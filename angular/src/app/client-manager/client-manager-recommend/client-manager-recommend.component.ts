import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, Inject, Optional } from '@angular/core';
import { ClientRecommendationService } from './client-recommendation.service';
import { ClientRecommendationDataSource } from './client-recommendation-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';


import { fromEvent, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { PropertyDetailComponent } from 'app/property-detail/property-detail.component';

import { ClientManagerSearchService } from '../client-manager-search/client-manager-search.service';
import { Client } from '../client-manager-search/client';
import { PropertiesService } from 'app/properties.service';




@Component({
  selector: 'app-client-manager-recommend',
  templateUrl: './client-manager-recommend.component.html',
  styleUrls: ['./client-manager-recommend.component.css']
})
export class ClientManagerRecommendComponent implements OnInit {

  recoDataSource: ClientRecommendationDataSource;

  displayedRecoColumns = ['addr', 'ml_num'];
  listingCount: number;
  recommendMLSNum: string;
  selectedClientId: Client;
  noClient: Client;
  getMLSVisible = false;
  favsLis: string
  @ViewChild(MatPaginator,  {static:false}) listingPaginator: MatPaginator;

  @ViewChild(MatSort,  {static:false}) listingSort: MatSort;

  @ViewChild('listingSearchInput',  {static:false}) listingSearchInput: ElementRef;

  selectedValue: string;

  private readonly _message = new Subject<string>();

  readonly message$ = this._message
    .asObservable()
    .pipe(tap(() => setTimeout(() => this._changeDetector.detectChanges())));





  constructor(private recommendationService: ClientRecommendationService, private dialog: MatDialog,
    @Optional() private readonly _changeDetector: ChangeDetectorRef,
    private clientsService: ClientManagerSearchService, public snackBar: MatSnackBar) {
    this.noClient = { userId: '-1', email: '', name: '', phone: '', firstName: '' };
    this.selectedClientId = this.noClient;

    this.recoDataSource = new ClientRecommendationDataSource(this.recommendationService);

  }

  ngOnInit() {
    this.favsLis = ''
    this.clientsService.clientManagerBuilder().subscribe(
      {
        next: (x) => {
        this.selectedClientId = x.client; this.loadListings();
          if (x.client.firstName) {
            this.favsLis = x.client.firstName + "'s Favs";
          } else if (x.client.name) {
            this.favsLis = x.client.name + "'s Favs";
          } else {
            this.favsLis = x.client.email + "'s Favs";
          }
         
        },
        error: (x) => { console.log('erroorz', x) }
      }
    );
    // might need to enable this ...
    //this.recoDataSource.loadListings();
    this.listingCount = 20;
    var self = this;
    try{
      if (chrome && chrome.tabs) {
        self.getMLSVisible = true;
        this.sendMessageToExtension();
  
      }
    }  catch(e){}
    


  }

  ngAfterViewInit() {
    if (this.listingSort) {
      this.listingSort.sortChange.subscribe(() => this.listingPaginator.pageIndex = 0);

      fromEvent(this.listingSearchInput.nativeElement, 'keyup')
        .pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap(() => {
            this.listingPaginator.pageIndex = 0;
            this.loadListings();
          })
        )
        .subscribe();

      merge(this.listingSort.sortChange, this.listingPaginator.page)
        .pipe(
          tap(() => this.loadListings())
        )
        .subscribe();

    }


  }

  loadListings() {
    this.recoDataSource.loadListings(
      this.listingSearchInput.nativeElement.value,
      this.listingSort.direction,
      this.listingPaginator.pageIndex,
      this.listingPaginator.pageSize);

  }

  showDetail(listing) {

    const dialogConfig = new MatDialogConfig();
    this.dialog.open(PropertyDetailComponent, {
      data: {
        listing: listing
      },
      height: '90vh',
      minWidth: '375px'
    });

  }

  getMLSNumber() {


    this.sendMessageToExtension();


  }

  sendMessageToExtension() {
    var self = this;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'request', function (response) {
        self.recommendMLSNum = response;
        self._changeDetector.detectChanges();
      });
    });
  }

  recommend() {
    this.clientsService.recommend(this.recommendMLSNum).subscribe(
      val => {

        if (val.status === 404) {
          alert('Please check the MLS#');
        }
        if (val.status === 201) {
          this.snackBar.open('Successfully recommended.','',{
            duration: 2000,
          });
          this.recommendMLSNum = '';
          this.loadListings();
        }

      }
    )
  }





}
