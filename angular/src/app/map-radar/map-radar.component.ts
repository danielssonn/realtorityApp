import { Component, OnInit } from '@angular/core';
import { ControlPosition } from '@agm/core'
import { PropertiesService } from 'app/properties.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { PropertyDetailComponent } from 'app/property-detail/property-detail.component';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-map-radar',
  templateUrl: './map-radar.component.html',
  styleUrls: ['./map-radar.component.css']
})
export class MapRadarComponent implements OnInit {

  lat: number
  lon: number;
  zoom: any;
  properties: any;
  propertiesAll: any;

  queryParams: any;
  polygons: any;
  fullscreenControlOptions: {
    position: ControlPosition.TOP_CENTER
  }
  mapStyle =
    [
      {
        'featureType': 'administrative.land_parcel',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'landscape',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#fffcf4'
          }
        ]
      },
      {
        'featureType': 'landscape.man_made',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'landscape.natural',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#fffcf4'
          },
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'labels.text',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'poi.business',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#b6f3bf'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#b6f3bf'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#ffb1a6'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#b6f3bf'
          },
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'labels.text',
        'stylers': [
          {
            'color': '#424242'
          },
          {
            'visibility': 'simplified'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#fffb9e'
          },
          {
            'visibility': 'on'
          },
          {
            'weight': 3
          }
        ]
      },
      {
        'featureType': 'road.local',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#ffb8a3'
          }
        ]
      },
      {
        'featureType': 'road.local',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road.local',
        'elementType': 'labels.text',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'transit.station.bus',
        'elementType': 'labels.icon',
        'stylers': [
          {
            'visibility': 'simplified'
          }
        ]
      },
      {
        'featureType': 'transit.station.rail',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#ffeb3b'
          },
          {
            'visibility': 'simplified'
          },
          {
            'weight': 1
          }
        ]
      },
      {
        'featureType': 'transit.station.rail',
        'elementType': 'labels.text',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'transit.station.rail',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      }
    ]
  constructor(private service: PropertiesService, private dialog: MatDialog, private route: ActivatedRoute, private spinner: NgxSpinnerService) {


    this.lat = 43.68938950763081;
    this.lon = -79.39403932633633;
    this.zoom = 12;

  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        // {order: "popular"}
        this.spinner.show();
        this.service.propertiesRadar(params).subscribe(
          response => {
            this.properties = response;
            this.spinner.hide();
          },
          err => { this.spinner.hide(); }

        )
      });

      this.service.communities().subscribe(
        response => {
            this.polygons = response.value
            this.service.setHeat('rateAll')
        }
    )

  }

  onMapReady(map) {
    map.setOptions({
      fullscreenControl: 'true',
      fullscreenControlOptions: {
        position: ControlPosition.TOP_LEFT
      }
    });
  }

  showDetail(property) {
    property.icon = "/assets/activePlace.svg";
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(PropertyDetailComponent, {
      data: {
        listing: property
      },
      height: '90vh',
      width: '400px',
      minWidth: '375px'
    });

  }
  getCenter(poly){

 
    let lat= poly[0].lat+((poly[Math.round(poly.length/2)].lat - poly[0].lat)/2)
    let lng= poly[0].lng+((poly[Math.round(poly.length/2)].lng - poly[0].lng)/2)

    return {latitude:lat,
    longitude:lng}
  }


}
