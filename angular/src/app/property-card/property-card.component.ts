import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgmCoreModule } from '@agm/_dev/packages/core';
import { PropertiesService } from '../properties.service';
import { MatSidenavModule } from '@angular/material';
import { SidenavService } from 'app/sidenav.service';
import { Location } from '@angular/common';




@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {
  propertyIcon: any;
  headlineImage: any;

  @Input() property: any;
  @Input() src: string;
  @Input() favs: boolean;
  @Input() dayOfWeek: any;

  preferences: any;


  constructor(private router: Router, private service: PropertiesService) {
    this.service.getUserPreferences().subscribe(
      value => this.preferences = value
    );
    
  }
  getPropertyIcon(property) {
    if (property.marketingMessage) {
      return 'assets/rss.svg'
    }
    // if(property.ml_num)
    return 'https://s3.amazonaws.com/mlspicz/' + this.property.ml_num + '-1';
      // return 'https://mlspicz.s3.amazonaws.com/main-'+this.property.ml_num;
  }
  onSwipe(evt) {
    console.log('swipe');
    const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left') : '';
    const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';
    if (x === 'right') {
      console.log('swipe right');
    }

  }
  showSingle() {

    if (this.preferences && this.preferences.goodSchools) {
      if (this.property.school_2 === 'null') {
        return true;
      }
      return false;
    }
    if (this.preferences && this.preferences.goodCatholicSchools) {
      if (this.property.school_2_c === 'null') {
        return true;
      }
      return false;
    }

  }

  showTwo() {
    if (this.preferences && this.preferences.goodSchools) {
      if (this.property.school_2 !== 'null') {
        return true;
      }
      return false;
    }
    if (this.preferences && this.preferences.goodCatholicSchools) {
      if (this.property.school_2_c !== 'null') {
        return true;
      }
      return false;
    }
  }
  showGreySchool() {
    if (this.preferences && !this.preferences.goodSchools && !this.preferences.goodCatholicSchools) {
      return true;
    }
    return false;
  }


  imageError($event) {
    if(this.property)
    $event.target.src = this.service.getCustomPropertyLabel(this.property);
  }


  getTrend() {
    let newPrice;
    if (this.property.new_price1) {
      newPrice = this.property.new_price1;
    }
    if (this.property.new_price2) {
      newPrice = this.property.new_price2;
    }

    if (this.property.lp_dol > newPrice) { return 1 }
    if (this.property.lp_dol < newPrice) { return 2 }
    return 3;
  }
  ngOnInit() {
    this.isDayMarker();
  }

  showDetail(property) {
    this.service.setSelectedProperty(property)
    this.router.navigate(['details', property.ml_num]);

  }
  remove(ev, property) {
    ev.stopPropagation();
  }

  isDayMarker(){
    console.log('day marker', (!!this.dayOfWeek))
  }
}
