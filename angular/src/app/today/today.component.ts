import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PropertiesService } from '../properties.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'app/user.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],

})
export class TodayComponent implements OnInit, AfterViewInit {
  today: any;
  properties: any;
  propertiesCount: number;
  date: any;
  mktMsg: any;
  
  @ViewChild(CdkVirtualScrollViewport,  {static:false}) viewport: CdkVirtualScrollViewport;



  constructor(private router: Router, private service: PropertiesService, private spinner: NgxSpinnerService,
    private userService: UserService, public snackBar: MatSnackBar, private translate: TranslateService) {

    this.date = moment().format('HH:mm')
    service.getUserPreferences().subscribe();

  }

  showDetail() {
    this.router.navigate(['details']);
  };

  startInterview() {
    this.router.navigate(['interview']);
  }

  ngOnInit() {
    
    this.today = new Date();
    this.spinner.show();
    this.service.daily(false).subscribe(
      value => {
        this.setProperties(value);
        this.spinner.hide();
      }
      , err => { this.spinner.hide(); this.router.navigate(['ohoh']) })




  }
  setProperties(props) {
    this.properties = [];
    this.propertiesCount = 0;

    props.forEach(
      property => {
        if (property.isIn) {
          this.propertiesCount++;
          this.properties.push(property)
        }
      }
    )

  }
  refresh() {
    this.properties = null;
    this.spinner.show();
    this.service.daily(true).subscribe(
      value => {
        this.setProperties(value);
        this.date = moment().format('HH:mm')
        this.spinner.hide();
        this.translate.get('Daily listings updated').subscribe((res: string) => {
          this.snackBar.open(res, '', {
            duration: 2000,
          });
        });

      }
    );
  }
  ngAfterViewInit(){
    
    setTimeout(() => {
      this.viewport.scrollToIndex(this.service.getScrollPosition());
  });
  
   
  }
 
  scrolledTo(ev){
    if(ev!=0){
      this.service.setScrollPosition(ev);

    }
  }

}
