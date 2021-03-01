import { Component, OnInit, Optional, AfterViewInit } from '@angular/core';
import { PropertiesService } from 'app/properties.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PropertyDetailComponent } from 'app/property-detail/property-detail.component';
import { timestamp, switchMap } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HowToComponent } from './how-to/how-to.component';
import { IfStmt, analyzeAndValidateNgModules } from '@angular/compiler';
import * as moment from 'moment';


@Component({
  selector: 'app-shazam',
  templateUrl: './shazam.component.html',
  styleUrls: ['./shazam.component.css'],
  animations: [
    trigger('balloonEffectTrigger', [
      state('initial', style({
        transform: 'scale(1)'
      })),
      state('final', style({
        transform: 'scale(1.05)'
      })),

      transition('void=>initial', style({

      })),
      transition('final=>initial', animate('1000ms')),
      transition('initial=>final', animate('1000ms')),
     
    ]),
  ]

})
export class ShazamComponent implements OnInit, AfterViewInit {

  address: { shortAddress: String, formattedAddress: String, stNum: number, street: String, zip: String };
  properties: any;
  itemsSize: number;
  propertiesPriorChunk: any;
  maxZoom: number;
  minZoom: number;
  zoomStep: number;
  zoomLevel: number;
  noResult: boolean;
  radius: any;
  addressChanged: boolean;
  sales: any
  streets: any[];
  streetNumber: any;
  accuracy: any;
  heading: any;
  latitute: any;
  longitude: any;
  alternates: any;
  alternateStreet: any;
  alternate: any;
  selectedStreet: any;
  streetNumberRange: any;
  showCalibration;
  salesCount;
  nearbyCount;
  hasResults;
  imageSource;
  currentState;
  zip;
  where;
  options;
  isLoaded;

  constructor(private service: PropertiesService, private spinner: NgxSpinnerService,
    private router: Router, private route: ActivatedRoute, private dialog: MatDialog) {
    this.address = { shortAddress: "", formattedAddress: "", stNum: 0, street: "", zip: "" };
    this.itemsSize = 80;
    this.minZoom = 1;
    this.maxZoom = 2;
    this.zoomStep = 1;
    this.zoomLevel = 2;
    this.noResult = false;
    this.radius = 0.005
    this.streets = [];
    this.showCalibration = false;
    this.salesCount = 0;
    this.nearbyCount = 0;
    this.hasResults = false;
    this.streetNumberRange = [];
    this.imageSource = "assets/listingsnearby.png";
      
    this.options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
  }

  calibration() {
    this.showCalibration = !this.showCalibration;
  }

  onEnd(event) {

    if (this.currentState) {
      this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
    }

  }

  ngOnInit() {

    
    this.currentState = 'initial';

    this.route.params.subscribe(params => {

      console.log("params", params)
      this.latitute = +params['latitude']; 
      this.longitude =  +params['longitude']; 
      let position = {coords: {latitude: String, longitude:String}};
     
      if(this.latitute && this.longitude){
        position.coords.latitude = this.latitute;
        position.coords.longitude = this.longitude;
        this.spinner.show();
        this.geoSuccess(position);
        

      }

   });
  }

  imageLoaded(){
    console.log('sdddssa')
    this.isLoaded = true;
  }

  ngAfterViewInit() {
   

  }

  geoSuccess = (position) => {
    console.log(position)
    this.hasResults = false;
    this.accuracy = position.coords.accuracy;
    this.heading = position.coords.heading;
    this.latitute = position.coords.latitude;
    this.longitude = position.coords.longitude

    this.service.getAddress(position.coords.latitude, position.coords.longitude, this.radius).subscribe(val => {
      this.alternates = [];
      this.alternateStreet = [];
      this.streets = [];
      this.streetNumberRange = [];
      if (val === "Created") {
        this.spinner.hide();
      }
      val.sort((a, b) => {
        return b.original - a.original
      })

      val.forEach(alt => {
       
        if (alt.original) {

          //if original, we want to put it in, anyway ... but remove previous same name street
          this.streets.push(alt);
          this.address = alt;
          this.validateZip();
          this.address.zip = this.zip;

          // this.address.stNum = parseInt(alt.shortAddress.substring(0, alt.shortAddress.indexOf(' ')));
          this.setStreetNumber(alt);
          this.getStreetNumberRange(this.address.stNum);
          this.selectedStreet = alt;
          
          this.alternateStreet.push(alt.street);
        }

        if (this.alternateStreet.indexOf(alt.street) == -1) {
          this.streets.push(alt)
          this.alternateStreet.push(alt.street);
        }

      })

      this.service.getCommunityMatch(position.coords.latitude, position.coords.longitude, this.radius, this.address.formattedAddress).subscribe(nearby => {
        
        console.log(nearby)
        this.addSales(nearby);

      });
    })
  }

  /**
   * We'll need a partial zip match to get sales. 
   */
  validateZip(){
    
    // we'll get first half of the ZIP from geocoding. M2N
    this.zip = this.address.formattedAddress.substring(this.address.formattedAddress.length - 15, this.address.formattedAddress.length - 12);

    var regex = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]$/i);

    if(!regex.test(this.zip)){
        console.log('ZIP validation fail');
        this.zip = null;
    }


  }


  /**
   * 
   * @param err Something went off the rails getting a location
   */
  geoError = (err) => { this.spinner.hide(); alert(err.message) }


  /**
   * 
   */
  findNearby() {
    this.properties = [];
    this.streets = [];
    this.sales = [];
    this.noResult = false;
    this.streetNumberRange = [];

    this.spinner.show();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError, this.options)
    }

  }


  selectedStreetChange(ev) {
    this.hasResults = false;
    this.sales = [];
    console.log('selected', this.selectedStreet)

    this.setStreetNumber(this.selectedStreet);
    console.log(this.address.stNum)
    this.getStreetNumberRange(this.address.stNum);
    this.streetNumberChange(1);

  }

  setStreetNumber(selectedStreet){
    let stNum = selectedStreet.shortAddress.substring(0, selectedStreet.shortAddress.indexOf(' '));

    if(isNaN(stNum)){
      // let's see if 1b would work with 1
      stNum = String(stNum).substring(0, stNum.length -1);
    }


    this.address.stNum = stNum *1;
  }

  getStreetNumberRange(streetRangeFrom) {
    
    console.log("b cutoff ", streetRangeFrom)
    this.streetNumberRange = [];



    if(isNaN(streetRangeFrom)){
      // let's see if 1b would work with 1
      streetRangeFrom = String(streetRangeFrom).substring(0, streetRangeFrom.length -1);
      console.log("cutoff ", streetRangeFrom)
      if( isNaN(streetRangeFrom) ){
        return;
      } 
    }

    var max;
    var from;
    if (streetRangeFrom >= 50) {
      max = 100;
      from = streetRangeFrom - 50
    } else {
      max = streetRangeFrom + 50;
      from = 1
    }

    

    for (let i = 0; i < max; i++) {

      this.streetNumberRange.push(from + i);

    }
    this.streetNumber = streetRangeFrom;


  }

  streetNumberChange(ev) {
    this.hasResults = false;
    this.properties = [];
    this.noResult = false;
    this.spinner.show();

    this.service.getCommunityMatch(this.latitute, this.longitude, this.radius, this.streetNumber + this.selectedStreet.street).subscribe(nearby => {

      this.addSales(nearby);

    });
  }



  addSales(nearby) {


  
    if (this.streetNumberRange.length>0) {
      this.address = this.selectedStreet;

      let street = this.selectedStreet.street ;
      let ind;
      // if the last space is less then before last letter - such as Salem Ave N. We need just Salem. For Baby Point Rd, we need Baby Point
      if(this.selectedStreet.street.lastIndexOf(" ")<this.selectedStreet.street.length-2){
        ind = this.selectedStreet.street.lastIndexOf(" ")
      } else{
        ind = this.selectedStreet.street.indexOf(" ")
      }

      if(this.selectedStreet.street.indexOf(" ")>0){
        street = this.selectedStreet.street.substring(0, ind)
      }

      this.service.getSales(this.streetNumber + " " + this.selectedStreet.street, this.streetNumber, street, this.streetNumberRange, this.zip).subscribe(sales => {
        this.salesCount = sales.length;
        this.nearbyCount = nearby.length;
        this.sales = this.chunkArrayInGroups(sales, 3);

        if (this.zoomLevel === this.minZoom) {
          this.where = "here"
        } else {
          this.where = "nearby"
        }

        nearby.sort((a, b) => b.cd > a.cd)
        this.propertiesPriorChunk = nearby;
        this.setProperties();
        this.spinner.hide();

      })
    } else {
      this.spinner.hide();
      alert("Please try again closer to some houses ... ");

    }

  }



  formatLabel(value: number) {
    if (value == 1) {
      return 'here';
    }
    if (value == 2) {
      return 'near';
    }
    if (value == 3) {
      return 'far';
    }

    return value;
  }
  zoomChange() {
    if (this.imageSource == "assets/listingsnearby.png") {
      this.imageSource = "assets/listingsaround.png";
    } else {
      this.imageSource = "assets/listingsnearby.png"
    }

    this.findNearby();
  }
  getPropertyIcon(property) {
    if (property.marketingMessage) {
      return 'assets/info.svg'
    }
    return 'https://s3.amazonaws.com/mlspicz/' + property.ml_num + '-1'
  }


  setProperties() {
   

    if (this.propertiesPriorChunk.length == 0) {
      this.noResult = true;
    }
    this.properties = this.chunkArrayInGroups(this.propertiesPriorChunk, 3);
    this.hasResults = true;
 
  }

  chunkArrayInGroups(arr, size) {
    var myArray = [];
    for (var i = 0; i < arr.length; i += size) {
      myArray.push(arr.slice(i, i + size));
    }
    return myArray;
  }


  imageError($event) {
    $event.target.src = 'assets/coming.png';
  }

  imageTooOld(ev){
    ev.target.src = '/assets/sold.png';
  }

  imageSold(property) {

    return 'https://s3.amazonaws.com/mlspicz/' + property.ml_num + '-1'
  }

  getAge(when){
    
    return moment().diff(when, 'months',false);
  }

  showDetail(property) {
    property.icon = "/assets/activePlace.svg";
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(PropertyDetailComponent, {
      data: {
        listing: property
      },
      height: '90vh',
      width: '80vw',
      minWidth: '375px'
    });

  }
  showHow() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(HowToComponent, {
      data: {
        address: this.address
      },
      height: '90vh',
      width: '80vw',
      minWidth: '375px'
    });

  }

  setMinZoom() {
    this.zoomLevel = this.minZoom;
    this.zoomChange();
  }
  setMaxZoom() {
    this.zoomLevel = this.maxZoom;
    this.zoomChange();
  }



}
