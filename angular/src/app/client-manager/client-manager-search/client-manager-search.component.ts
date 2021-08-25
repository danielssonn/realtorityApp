import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CoolLocalStorage } from '@angular-cool/storage';
import { Client } from 'app/client-manager/client-manager-search/client';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonToggle } from '@angular/material/button-toggle';


import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent, merge, Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { ClientManagerSearchDataSource } from './client-manager-search.datasource';
import { ClientManagerSearchService } from './client-manager-search.service';
import { ClientManagerDetailsComponent } from '../client-manager-details/client-manager-details.component';
import { ClientOverviewComponent } from '../client-overview/client-overview.component';
import { group } from '@angular/animations';
import { ClientActivityTrackingService } from '../activity/client-activity.service';
import { ClientReleaseDialogComponent } from './client-release-dialog/client-release-dialog.component';
import { ClientSelectionDialogComponent } from './client-selection-dialog/client-selection-dialog.component';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';



@Component({
  selector: 'app-client-search-manager',
  templateUrl: './client-manager-search.component.html',
  styleUrls: ['./client-manager-search.component.css']
})
export class ClientManagerSearchComponent implements OnInit {

  salesPersonId: any;

  clientCount: number;

  dataSource: ClientManagerSearchDataSource;
  selectedClientId: Client;
  noClient: Client;
  clientName: string;

  displayedColumns = ['name', 'email', 'select'];

  @ViewChild(MatPaginator, { static: false }) clientSearchPaginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) clientSearchSort: MatSort;

  @ViewChild('clientSearchInput', { static: false }) clientSearchInput: ElementRef;

  activity: any;
  activityLabel = "";
  activityLabelShort = "";
  segmentList: any;
  private subscription: Subscription;



  constructor(private session: CoolLocalStorage, private clientsService: ClientManagerSearchService,
    public dialog: MatDialog, private activityService: ClientActivityTrackingService) {
    this.salesPersonId = this.session.getItem('salesPersonId');
    this.noClient = { userId: '-1', email: '', name: '', phone: '', firstName: '' };
    this.selectedClientId = this.noClient;

    this.dataSource = new ClientManagerSearchDataSource(this.clientsService);
    this.clientName = '';



  }

  ngOnInit() {

    this.activityService.getClientSegments().subscribe(
      segList =>{
        this.segmentList = segList;
      }
    );

    this.subscription = this.activityService.activityChangeAnnounced.subscribe(
      act => {

        this.activity = act;
        if (this.activity.activity == "checking") {
          this.activityLabel = this.segmentList[this.activity.segment].segmentDescription+" Viewing: "+ this.activity.days+" days";
          this.activityLabelShort = "Views";
          this.session.setItem('activity', this.activity.activity);
          this.session.setItem('activityLabel', this.activityLabel);
          this.session.setItem('days', this.activity.days);
          this.session.setItem('segment', this.activity.segment);
        }
        if (this.activity.activity == "tracking") {
          this.activityLabel = this.segmentList[this.activity.segment].segmentDescription+" Tracking: "+ this.activity.days+" days";
          this.activityLabelShort = "Tracks";
          this.session.setItem('activity', this.activity.activity);
          this.session.setItem('activityLabel', this.activityLabel);
          this.session.setItem('days', this.activity.days);
          this.session.setItem('segment', this.activity.segment);
        }
        if (this.activity.activity == "trackingSold") {
          this.activityLabel = this.segmentList[this.activity.segment].segmentDescription+" w. Track + Sold: "+ this.activity.days+" days";
          this.activityLabelShort = "Tracks + Sold";
          this.session.setItem('activity', this.activity.activity);
          this.session.setItem('activityLabel', this.activityLabel);
          this.session.setItem('days', this.activity.days);
          this.session.setItem('segment', this.activity.segment);
        }
        if (this.activity.activity == "engaging") {
          this.activityLabel = this.segmentList[this.activity.segment].segmentDescription+" Sign Ups: "+ this.activity.days+" days";
          this.activityLabelShort = "Sign Ups";
          this.session.setItem('activity', this.activity.activity);
          this.session.setItem('activityLabel', this.activityLabel);
          this.session.setItem('days', this.activity.days);


        }
        if (this.activity.activity == "segmentOrDayChange") {
          this.activityLabel = "";
          this.session.setItem('activityLabel', this.activityLabel);
          this.session.setItem('activity', 'null');
          this.session.setItem('days', 'null');

        }

        if( this.clientSearchPaginator){
          this.clientSearchPaginator.firstPage();

        }



        if (this.selectedClientId.userId != "-1") {
          // this.openReleaseDialog();
          // this.release();
          this.loadClients();

        }
        else {
          this.loadClients();
        }


      });

    if (!this.activity) {
      console.log('should get activity from session')
      this.activity = {};
      this.activity.activity = this.session.getItem('activity');
      this.activity.days = this.session.getItem('days');
      this.activity.segment = this.session.getItem('segment');
      this.activityLabel = this.session.getItem('activityLabel');
      this.loadClients();
    }


    this.clientsService.getActiveClient().subscribe(
      val => {
        this.selectedClientId = val;
        if (this.selectedClientId.userId != "-1") {
          // this.dataSource.loadClient(this.selectedClientId.userId);

        }
      }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  loadClients() {
    if (this.activity.activity == "segmentOrDayChange") {
      this.dataSource.reset();
    }
    else {
      
      this.dataSource.loadClients("", this.activity.activity, this.activity.days, this.activity.segment);

      this.clientsService.getActiveClient().subscribe(
        val => {
          this.selectedClientId = val;
          // this.clientName = val.name;

        }
      )
    }
  }


  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    if (this.clientSearchSort) {
      this.clientSearchSort.sortChange.subscribe(() => this.clientSearchPaginator.pageIndex = 0);

      fromEvent(this.clientSearchInput.nativeElement, 'keyup')
        .pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap(() => {
            this.clientSearchPaginator.pageIndex = 0;
            this.loadClientsPage();
          })
        )
        .subscribe();

      merge(this.clientSearchSort.sortChange, this.clientSearchPaginator.page)
        .pipe(
          tap(() => this.loadClientsPage())
        )
        .subscribe();

    }
  }

  
  loadClientsPage() {
    if (this.activity) {

      this.dataSource.loadClients(
        this.clientName,
        this.activity.activity,
        this.activity.days,
        this.activity.segment,
        this.clientSearchPaginator.pageIndex,
        this.clientSearchPaginator.pageSize,
      );
    }

  }

  sortChange(ev) {
    this.loadClientsPage();
  }

  toggle(row, event) {

    if (event.checked) {
      this.openClientSelectDialog();
      this.selectedClientId = row;
      // this.clientName = this.selectedClientId.name;
      this.clientsService.setActiveClient(this.selectedClientId).subscribe();
      // this.dataSource.loadClients(this.selectedClientId.name, this.activity.activity, this.activity.days, this.activity.segment);

    } else {
      this.clientName = '';
      this.selectedClientId = this.noClient;
      this.clientsService.setActiveClient(this.selectedClientId).subscribe();
      // this.dataSource.loadClients(this.selectedClientId.name, this.activity.activity, this.activity.days, this.activity.segment);
    }

  }
  release() {
    this.clientName = '';
    this.selectedClientId = this.noClient;
    this.clientsService.setActiveClient(this.selectedClientId).subscribe();

    if (this.activity) {
      this.dataSource.loadClients(this.selectedClientId.name, this.activity.activity, this.activity.days, this.activity.segment);
    }
    this.dataSource.reset();

  }
  openOverview(client) {
    console.log('client ', client)

    const dialogSpec = {
      height: '100vh',
      width: '100vw',
      data: {
        dataKey: client
      }
    };

    let dialogRef: any;

    dialogRef = this.dialog.open(ClientManagerDetailsComponent, dialogSpec);
    dialogRef.afterClosed().subscribe(result => {

      if (result && result !== 'close') {
        console.log('load after close', result)
        this.loadClientsPage();

      }
    });

  }

  openDetails(client) {

    client.activity = this.activityLabelShort;
    const dialogSpec = {
      height: '100vh',
      width: '100vw',
      data: {
        dataKey: client
      }
    };

    let dialogRef: any;

    dialogRef = this.dialog.open(ClientOverviewComponent, dialogSpec);
    dialogRef.afterClosed().subscribe(result => {

      if (result && result !== 'close') {

        this.loadClientsPage();

      }
    });

  }

  openClientSelectDialog() {
    const dialogSpec = {
      height: '28vh',
      width: '100vw',

    };

    let dialogRef: any;

    dialogRef = this.dialog.open(ClientSelectionDialogComponent, dialogSpec);
    dialogRef.afterClosed().subscribe(result => {

      if (result && result !== 'close') {
         result;

      }
    });
  }

  openReleaseDialog() {
    const dialogSpec = {
      height: '25vh',
      width: '100vw',

    };

    let dialogRef: any;

    dialogRef = this.dialog.open(ClientReleaseDialogComponent, dialogSpec);
    dialogRef.afterClosed().subscribe(result => {

      if (result && result !== 'close') {


      }
    });
  }


}
