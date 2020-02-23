import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertiesService } from '../properties.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'app/user.service';
import { MatSnackBar } from '@angular/material';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';



@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css'],

})

export class WeekComponent implements OnInit, AfterViewInit {

  day1: any;
  day2: any;
  day3: any;
  day4: any;
  day5: any;
  day6: any;
  day7: any;
  today: any;
  propertiesWeekly: any;
  propertiesCount: number;
  days = [];
  dayDates = []
  isAuth;
  properties: any;
  calendar = [];

  @ViewChild(CdkVirtualScrollViewport,  {static:false}) viewport: CdkVirtualScrollViewport;


  showDetail() {
    this.router.navigate(['details']);
  };

  startInterview() {
    this.router.navigate(['interview']);
  }

  constructor(private router: Router, private service: PropertiesService, private spinner: NgxSpinnerService,
    private translate: TranslateService, private userService: UserService, public snackBar: MatSnackBar, ) {
     this.isAuth =  this.userService.isAuthenticated();
     this.service.getUserPreferences().subscribe();
  }



  addWeek() {

    if(!this.service.addWeek()){
      this.translate.get('Maximum number of weeks reached').subscribe((res: string) => {
        this.snackBar.open(res, '', {
          duration: 2000,
        });
      });
    } else {

      this.refresh();
    }
   
    
  }

  setProperties(props) {
    if(!Array.isArray(props)){
      return;
    }
    this.properties = [];
    this.propertiesCount = 0;
    
    props.sort(function(a,b){
      var c = new Date(a.added);
      var d = new Date(b.added);
      return +d- +c;
    })
    if (!props || !props[0]) {
    
      return;
    }
  
    this.calendar = [];
    props.forEach(property => {
      
      if(property.isIn){
        this.propertiesCount++;
        const dateInMonth = moment(property.added).format('l');

        if(this.calendar.indexOf(dateInMonth) === -1){
          this.calendar.push(dateInMonth)
          property.d = dateInMonth
        }
        this.properties.push(property)  
      }


    });
    this.propertiesCount = this.properties.length;


  }

  displayDate(property) {

    const datePipe = new DatePipe(this.translate.currentLang);

    return datePipe.transform(moment(property.added), 'EEE, d');
  }

  ngOnInit() {
    this.spinner.show();
    this.service.weekly(false).subscribe(
      value => {
        this.setProperties(value);
        this.spinner.hide();
      }, err => {  this.spinner.hide(); this.router.navigate(['ohoh']) });
  }

  refresh() {
    this.spinner.show();
    this.setProperties([]);
    this.service.weekly(true).subscribe(
      value => {
      
        this.setProperties(value)
        this.spinner.hide();
        this.translate.get('Weekly listings updated').subscribe((res: string) => {
          this.snackBar.open(res, '', {
            duration: 2000,
          });
        });
      });
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