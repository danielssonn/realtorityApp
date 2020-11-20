import { Component, OnInit, ViewChildren, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { LocationComponent } from '../location/location.component';
import { PropertiesService } from '../../../properties.service';

import * as wkt from 'terraformer-wkt-parser/dist/terraformer-wkt-parser.js';
// import * as wkt from '../../node_modules/terraformer-wkt-parser/dist/terraformer-wkt-parser.js';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'app/user.service';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { SidenavService } from 'app/sidenav.service';
import { MessageService } from 'app/message.service';
import { Subscription } from 'rxjs';
import { ViewportScroller } from '@angular/common';



@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  locations: Array<any>;
  active: boolean;
  addingDisabled: boolean;
  weeklycount: any;
  allSaved: any;
  shouldScroll: boolean;
  @Input() savingDisabled = true;
  @Input() nextDisabled = true;


  private components: LocationComponent[];
  @ViewChildren('myMap') myMaps: LocationComponent[];
  @ViewChild('scrollBottom',  {static:false}) private scrollBottom: ElementRef;
  
  isAuth;
  subscription: Subscription;
  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, private service: PropertiesService, private router: Router, private spinner: NgxSpinnerService,
    private messageService: MessageService, private viewportScroller: ViewportScroller,
    // tslint:disable-next-line:max-line-length
    public snackBar: MatSnackBar, private translate: TranslateService) {
    this.locations = new Array();
    this.components = new Array();
    this.isAuth = this.userService.isAuthenticated();
    this.spinner.show();
    
    
    // subscription on main click
    this.subscription = this.messageService.getMessage().subscribe(message => { 
    
      if(message.text ==='clack'){
          if(!this.allSaved){ 
            this.saveMaps(true);
          }
      }
     });

   

    service.getAreas().subscribe(response => {
      if (response.length === 0) {
        this.spinner.hide();
        return;
      }
      response.forEach(area => {
        const geo = area.center.split(',');

        const poly = []

        const polyg = wkt.parse(area.polygon).coordinates[0];

        this.nextDisabled = false;
       

        this.active = false;

        polyg.forEach(coords => {
          poly.push({ lat: coords[0], lng: coords[1] })
        })

        this.locations.push({
          zoom: parseFloat(area.zoom), lat: parseFloat(geo[0]), lon: parseFloat(geo[1]),
          polygon: poly
        });
        if(this.locations.length>1){
          this.shouldScroll = true;
        }
        this.spinner.hide();
      })
    });
  }
  onSwipe(evt) {
    const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left') : '';
    const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';
    if (x === 'left') {
      this.next();
    }
    if (x === 'right') {
    }
  }

  next() {
    this.saveMaps(false);
    this.router.navigate(['./interview/type']);
  }

  ngOnInit() {
    this.allSaved=1;
   
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  
  addLocation() {
    this.spinner.show();
    this.shouldScroll = true;
    this.locations.push({ zoom: 14, lat: 43.6532, lon: -79.3832 })
    if (this.locations.length >= 12) {
      this.addingDisabled = true;
    }
    this.spinner.hide();

    this.snackBar.open('OK! Move the map to your preferred area and Tap to set it.','Dismiss',{
      duration: 8000,
      
    });
   
    

  }

  handleLocationAdded(event, index) {
    this.checkMapUpdateButtons();
    this.allSaved = 0;  
    if(this.locations.length<=1){
      this.shouldScroll = false;
    } else{
      this.shouldScroll = true;
    }


  }

  handleMapRemoved(event, index) {
   
    this.locations.splice(index, 1);
    // this.saveMaps();
    this.addingDisabled = false;
    this.allSaved = 0;

    if(this.locations.length<=1){
      this.shouldScroll = false;
    } else {
      this.shouldScroll = true;
    }
  }

  handlePolyRemoved(event, index) {
   
    // this.saveMaps();
    this.allSaved = 0;

  }

  handlePolyMoved(event, index) {
    this.checkMapUpdateButtons();
    this.allSaved = 0;
   
    
  }



  checkMapUpdateButtons() {
    this.savingDisabled = true;
    this.nextDisabled = true;
    this.myMaps.forEach(component => {
      if (component.polygon) {
        this.savingDisabled = false;
        this.nextDisabled = false;
      }
    })

  }

  handleSaveMaps(event, index){
    this.saveMaps(false);
  }
  
  saveMaps(showConfirm) {
   this.spinner.show();
    this.allSaved = 1;
    if (!this.userService.isAuthenticated()) {
      this.spinner.hide();
      return;
    }
    this.nextDisabled = true;
    const message = [];
    const promises = []
    this.service.clearCachedProperties();
   
    if (this.myMaps.length == 0) {
      this.service.saveAreas([]);
      this.nextDisabled=true;
      this.spinner.hide();
      return;
      
    }

    this.myMaps.forEach(component => {
      
      try {
        if (component.polygon && component.polygon.getPolygonPath() && component.polygon.draggable) {
          

          promises.push(component)
          component.polygon.getPolygonPath().then(
            poly => {
              message.push({ zoom: component.map.zoom, polygon: poly, lat: component.map.latitude, lng: component.map.longitude })
            }
          )
        } else {
         
          this.nextDisabled = true;
          this.spinner.hide();
          // this.service.saveAreas([]);
          return;
         
        }
      } catch (e) {
        this.spinner.hide();
        //  console.log('Silencio!', e)
      }
    })

    Promise.all(promises).then(
      resolved => {
        if (message.length > 0) {
          this.service.saveAreas(message).then(
            val => {
              
              if(showConfirm) this.spinner.hide();
              if (val === 'OK' && showConfirm) {
                this.translate.get('Search area was set').subscribe((res: string) => {
                  this.snackBar.open(res, '', {
                    duration: 2000,
                  });
                });
              }
            }
          );
         
          this.nextDisabled = false;

        }

      }
    )



    // this.polygon  .getPolygonPath().then(data => {
    //   data.forEach((path, i) => {
    //     console.log(i + ': ' + path.lat() + ' - ' + path.lng());
    //   })
    // })


  }

}
