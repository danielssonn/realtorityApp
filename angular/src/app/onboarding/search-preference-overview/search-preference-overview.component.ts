import { Component, OnInit } from '@angular/core';
import { PropertiesService } from 'app/properties.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-preference-overview',
  templateUrl: './search-preference-overview.component.html',
  styleUrls: ['./search-preference-overview.component.css']
})
export class SearchPreferenceOverviewComponent implements OnInit {
  propertyType: string;
  priceFrom: any;
  priceTo: any;
  beds: string;
  baths: string;
  typeIndicator: string
  constructor(private propertiesService: PropertiesService) {
    this.propertyType = 'Type:';
    this.beds = ' Beds:';
    this.baths = ' Baths:';
  }



  ngOnInit() {
    this.propertiesService.getUserPreferences().subscribe(
      val => {

        /**
         * ageFrom: null
          ageTo: null
          area1: null
          area2: null
          area3: null
          area4: null
          area5: null
          bath1: 1
          bath2: 1
          bath3: 1
          bath4: 1
          bath5: 0
          bed1: 1
          bed2: 1
          bed3: 1
          bed4: 1
          bed5: 1
          condo: 0
          detached: 1
          goodCatholicSchools: null
          goodSchools: null
          keyword1: null
          keyword2: null
          keyword3: null
          keyword4: null
          parking: "0"
          priceFrom: 800000
          priceTo: 2750000
          semi: 1
          sizeFrom: null
          sizeTo: null
          townhouse: 0
          userId: 20
         */
        if (val.condo) {
         
            this.propertyType = this.propertyType + 'C'
        }
        if (val.semi) {
          this.propertyType = this.propertyType + 'S'
        }
        if (val.detached) {
          this.propertyType = this.propertyType + 'D'
        }
        if (val.townhouse) {
          this.propertyType = this.propertyType + 'T'
        }
        this.priceFrom = val.priceFrom;
        this.priceTo= val.priceTo;

        if (val.bed1){
          this.beds = this.beds+'1'
        }
        if (val.bed2){
          this.beds = this.beds+'2'
        }
        if (val.bed3){
          this.beds = this.beds+'3'
        }
        if (val.bed4){
          this.beds = this.beds+'4'
        }
        if (val.bed5){
          this.beds = this.beds+'5+'
        }
        if (val.bath1){
          this.baths = this.baths+'1'
        }
        if (val.bath2){
          this.baths = this.baths+'2'
        }
        if (val.bath3){
          this.baths = this.baths+'3'
        }
        if (val.bath4){
          this.baths = this.baths+'4'
        }
        if (val.bath5){
          this.baths = this.baths+'5+'
        }
      }
    )
  }
 

}
