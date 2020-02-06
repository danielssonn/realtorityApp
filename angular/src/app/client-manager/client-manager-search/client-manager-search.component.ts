import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CoolLocalStorage } from '@angular-cool/storage';
import { Client } from 'app/client-manager/client-manager-search/client';
import { MatPaginator, MatSort, MatDialog, MatButtonToggle } from '@angular/material';

import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { ClientManagerSearchDataSource } from './client-manager-search.datasource';
import { ClientManagerSearchService } from './client-manager-search.service';
import { ClientManagerDetailsComponent } from '../client-manager-details/client-manager-details.component';
import { ClientOverviewComponent } from '../client-overview/client-overview.component';
import { group } from '@angular/animations';



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

  @ViewChild(MatPaginator,  {static:false}) clientSearchPaginator: MatPaginator;

  @ViewChild(MatSort,  {static:false})clientSearchSort: MatSort;

  @ViewChild('clientSearchInput',  {static:false}) clientSearchInput: ElementRef;

  @ViewChild('sortByGroup',  {static:false}) sortOn: MatButtonToggle;




  constructor(private session: CoolLocalStorage, private clientsService: ClientManagerSearchService,
    public dialog: MatDialog) {
    this.salesPersonId = this.session.getItem('salesPersonId');
    this.noClient = {userId:'-1', email:'', name: '', phone: '', firstName: ''};
    this.selectedClientId = this.noClient;
    
    this.dataSource = new ClientManagerSearchDataSource(this.clientsService);
    this.clientName = '';

  }

  ngOnInit() {
   
    
    this.clientsService.getActiveClient().subscribe(
      val => {

        this.selectedClientId = val;
        this.clientName = val.name;
        this.dataSource.loadClients(this.salesPersonId, this.selectedClientId.email, this.sortOn.value);

      }
    )
    
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
    console.log('client name',this.clientName);
    this.dataSource.loadClients(
      this.salesPersonId,
      this.clientName,
      this.sortOn.value,
      this.clientSearchSort.direction,
      this.clientSearchPaginator.pageIndex,
      this.clientSearchPaginator.pageSize,
    );
  }

  sortChange(ev){
    this.loadClientsPage();
  }

  toggle(row, event) {
    console.log('selected', row, event);
    if (event.checked) {
      this.selectedClientId = row;
      this.clientName=this.selectedClientId.name;
      this.clientsService.setActiveClient(this.selectedClientId).subscribe();
      this.dataSource.loadClients(this.salesPersonId, this.selectedClientId.email, this.sortOn.value);

    } else {
      this.clientName='';
      this.selectedClientId = this.noClient; 
      this.clientsService.setActiveClient(this.selectedClientId).subscribe();
      this.dataSource.loadClients(this.salesPersonId, this.selectedClientId.email, this.sortOn.value);
    }

  }
  release(){
    this.clientName='';
    this.selectedClientId = this.noClient;
    this.clientsService.setActiveClient(this.selectedClientId).subscribe();
    this.dataSource.loadClients(this.salesPersonId, this.selectedClientId.email, this.sortOn.value);

  }
  openDetails(client) {


    const dialogSpec = {
      height: '90vh',
      width: '90vw',
      data: {
        dataKey: client
      }
    };

    let dialogRef: any;

    dialogRef = this.dialog.open(ClientManagerDetailsComponent, dialogSpec);
    dialogRef.afterClosed().subscribe(result => {

      if (result !== 'close') {
        this.loadClientsPage();

      }
    });

  }

  openOverview(client) {


    const dialogSpec = {
      height: '90vh',
      width: '90vw',
      data: {
        dataKey: client
      }
    };

    let dialogRef: any;

    dialogRef = this.dialog.open(ClientOverviewComponent, dialogSpec);
    dialogRef.afterClosed().subscribe(result => {

      if (result !== 'close') {
        this.loadClientsPage();

      }
    });

  }


}
