import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CoolLocalStorage } from '@angular-cool/storage';
import { Client } from 'app/client-manager/client-manager-search/client';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonToggle } from '@angular/material/button-toggle';


import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { ClientManagerSearchDataSource } from './client-manager-search.datasource';
import { ClientManagerSearchService } from './client-manager-search.service';
import { ClientManagerDetailsComponent } from '../client-manager-details/client-manager-details.component';
import { ClientOverviewComponent } from '../client-overview/client-overview.component';
import { group } from '@angular/animations';
import { ClientActivityTrackingService } from '../activity/client-activity.service';



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

  displayedColumns = ['select', 'name', 'email'];

  @ViewChild(MatPaginator, { static: false }) clientSearchPaginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) clientSearchSort: MatSort;

  @ViewChild('clientSearchInput', { static: false }) clientSearchInput: ElementRef;

  activity: any;
  activityLabel = "";




  constructor(private session: CoolLocalStorage, private clientsService: ClientManagerSearchService,
    public dialog: MatDialog, private activityService: ClientActivityTrackingService) {
    this.salesPersonId = this.session.getItem('salesPersonId');
    this.noClient = { userId: '-1', email: '', name: '', phone: '', firstName: '' };
    this.selectedClientId = this.noClient;

    this.dataSource = new ClientManagerSearchDataSource(this.clientsService);
    this.clientName = '';

    this.activityService.activityChangeAnnounced.subscribe(
      act => {

        this.activity = act;
        if(this.activity.activity =="checking"){
          this.activityLabel = "Click Clients"
        }
        if(this.activity.activity =="tracking"){
          this.activityLabel = "Track Clients"
        }
        if(this.activity.activity =="trackingSold"){
          this.activityLabel = "Track + Sold Clients"
        }
        if(this.activity.activity =="engaging"){
          this.activityLabel = "Sign Ups"
        }
        if(this.activity.activity =="segmentOrDayChange"){
          this.activityLabel = ""
        }
        this.clientSearchPaginator.firstPage();
        this.loadClients();

      });


  }

  ngOnInit() {
    
  }

 

  loadClients() {
    if (this.activity.activity == "segmentOrDayChange") {
      this.dataSource.reset();
    }
    else {
      this.clientsService.getActiveClient().subscribe(
        val => {
          this.selectedClientId = val;
          this.clientName = val.name;
          this.dataSource.loadClients(this.selectedClientId.email, this.activity.activity, this.activity.days, this.activity.segment);

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
    if(this.activity){
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
    console.log('selected', row, event);
    if (event.checked) {
      this.selectedClientId = row;
      this.clientName = this.selectedClientId.name;
      this.clientsService.setActiveClient(this.selectedClientId).subscribe();
      this.dataSource.loadClients(this.selectedClientId.email, this.activity.activity, this.activity.days, this.activity.segment);

    } else {
      this.clientName = '';
      this.selectedClientId = this.noClient;
      this.clientsService.setActiveClient(this.selectedClientId).subscribe();
      this.dataSource.loadClients(this.selectedClientId.email, this.activity.activity, this.activity.days, this.activity.segment);
    }

  }
  release() {
    this.clientName = '';
    this.selectedClientId = this.noClient;
    this.clientsService.setActiveClient(this.selectedClientId).subscribe();
    this.dataSource.loadClients(this.selectedClientId.email, this.activity.activity, this.activity.days, this.activity.segment);

  }
  openDetails(client) {
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

  openOverview(client) {

    
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


}
