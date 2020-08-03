import { Component, OnInit } from '@angular/core';
import { PropertiesService } from 'app/properties.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { PropertyDetailComponent } from 'app/property-detail/property-detail.component';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-shazam',
  templateUrl: './shazam.component.html',
  styleUrls: ['./shazam.component.css']
})
export class ShazamComponent implements OnInit {

  address: { shortAddress: String, formattedAddress: String, stNum: number, street: String };
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
  alternate:any;
  selectedStreet:any;
  streetNumberRange: any;


  constructor(private service: PropertiesService, private spinner: NgxSpinnerService,
    private router: Router, private dialog: MatDialog) {
    this.address = { shortAddress: "", formattedAddress: "", stNum: 0, street: "" };
    this.itemsSize = 80;
    this.minZoom = 0.0002;
    this.maxZoom = 5;
    this.zoomStep = 1;
    this.zoomLevel = 2;
    this.noResult = false;
    this.radius = 0.005
    this.streets = [];


  }

  ngOnInit() {
  }

  geoSuccess = (position) => {
    console.log(position);
    this.accuracy = position.coords.accuracy;
    this.heading = position.coords.heading;
    this.latitute = position.coords.latitude;
    this.longitude = position.coords.longitude
    this.service.getAddress(position.coords.latitude, position.coords.longitude, this.radius).subscribe(val => {
      this.alternates = [];
      this.alternateStreet = [];
      this.streets = [];
      val.forEach(alt => {
        console.log(this.alternateStreet, this.alternateStreet.indexOf(alt.street))
       
        if (this.alternateStreet.indexOf(alt.street) == -1) {
          this.streets.push(alt)
          this.alternateStreet.push(alt.street);
        }
      })

      this.selectedStreet = val[0];
      
      this.address = val[0];

      this.address.stNum = val[0].shortAddress.substring(0, val[0].shortAddress.indexOf(' ')) - 20
      this.getStreetNumberRange(this.address.stNum );

      this.service.getCommunityMatch(position.coords.latitude, position.coords.longitude, this.radius, this.address.formattedAddress).subscribe(nearby => {



        this.service.getSales(this.streetNumber + " " +this.selectedStreet.street).subscribe(sales => {

          this.propertiesPriorChunk = sales.concat(nearby);
          this.setProperties();
          this.spinner.hide();

        })

      });
    })
  }

  /**
   * 
   * @param err Something went off the rails getting a location
   */
  geoError = (err) => { console.log(err); alert(err.message) }

  /**
   * 
   */
  findNearby() {

    this.properties = [];
    this.noResult = false;
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    this.spinner.show();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError, options)
    }

  }

  selectedStreetChange(ev) {
    console.log(this.selectedStreet)
    this.address.stNum = this.selectedStreet.shortAddress.substring(0, this.selectedStreet.shortAddress.indexOf(' ')) - 20
    this.getStreetNumberRange(this.address.stNum );
    this.streetNumberChange(1);

  }

  getStreetNumberRange(streetRangeFrom){

    console.log('street range from',streetRangeFrom)
    
    this.streetNumberRange = []

      for (let i = 0; i < 40; i++) {

        this.streetNumberRange.push({ number: (streetRangeFrom + i) });
      }
      this.streetNumber = this.address.stNum + 20;


  }

  streetNumberChange(ev) {
    this.properties = [];
    this.noResult = false;
    this.spinner.show();

    this.service.getCommunityMatch(this.latitute, this.longitude, this.radius, this.streetNumber + this.selectedStreet.street).subscribe(nearby => {


      this.service.getSales(this.streetNumber +" "+this.selectedStreet.street).subscribe(sales => {

        this.propertiesPriorChunk = sales.concat(nearby);
        this.setProperties();
        this.spinner.hide();

      })


    });


  }

  /**
   * Refine based on exact address
   */
  refine() {
    // this.properties = [];
    // this.noResult = false;
    // this.spinner.show();



    // this.service.getSales(this.address.shortAddress).subscribe(sales => {

    //   this.propertiesPriorChunk = nearby.concat(sales);
    //   this.setProperties();
    //   this.spinner.hide();

    // })


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
    this.findNearby();
  }
  getPropertyIcon(property) {
    if (property.marketingMessage) {
      return 'assets/info.svg'
    }
    return 'https://s3.amazonaws.com/mlspicz/' + property.ml_num + '-1'
  }


  setProperties() {
    this.spinner.show();
    if (this.propertiesPriorChunk.length == 0) {
      this.noResult = true;
    }
    this.properties = this.chunkArrayInGroups(this.propertiesPriorChunk, 3);
    this.spinner.hide();
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

  imageSold() {
    return '/assets/sold.png';
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


}
