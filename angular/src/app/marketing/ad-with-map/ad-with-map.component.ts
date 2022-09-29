import { Component, Input, OnInit } from '@angular/core';
import { Marketing } from '../marketing';
// import { ControlPosition } from '@agm/core'
import { PropertiesService } from 'app/properties.service';
import { MarketingService } from '../marketing.service';

@Component({
  selector: 'app-ad-with-map',
  templateUrl: './ad-with-map.component.html',
  styleUrls: ['./ad-with-map.component.css']
})
export class AdWithMapComponent implements Marketing, OnInit {

  polygons: any;
  markers: any;
  lat: number;
  lon: number;
  zoom: number;

//   fullscreenControlOptions: {
//     position: ControlPosition.TOP_CENTER
//   };
  
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



  @Input() data: any;

  constructor(private service: MarketingService) { }

  ngOnInit() {
    this.lat = Number.parseFloat(this.data.map.lat);
    this.lon = Number.parseFloat(this.data.map.lon);
    this.zoom = Number.parseInt(this.data.map.zoom);
    this.service.getPolygons(this.data.key).subscribe(
      response => {
        let polyPath = [];
        this.polygons = [];
        let opacity = 0.0;
        let polyStroke;
        let community = '';
        opacity = 0.0;
        polyStroke = {
          color: 'white',
          weight: 1
        }

        
        response.forEach(
          value => {
            if (value.community !== community) {
              polyPath = [];
              community = value.community;
              polyPath.push({
                lat: value.latitude++,
                lng: value.longitude++
              });
              const polygon = {
                idKey: value.community,
                id: value.community,
                paths: polyPath,
                stroke: polyStroke,
                editable: false,
                draggable: false,
                geodesic: false,
                visible: true,
                clickable: false,
                rateDetached: value.rateDetached,
                rateSemi: value.rateSemi,
                rateCondo: value.rateCondo,
                rateAll: value.rateAll,
                show: value.show,
                rateRowhouse: value.rateRowhouse,
                fill: {
                  color: 'red'
                }
              }
              this.polygons.push(polygon)

            } else {
              polyPath.push({
                lat: value.latitude++,
                lng: value.longitude++
              });

            }
          })

      }
    )
    this.service.getMarkers(this.data.key).subscribe(
      response => {
        
        this.markers = [];
       
        response.forEach(
          development => {
            const geo = development.geo.split(',');
            let lat = geo[0];
            let lng = geo[1];

            this.markers.push({
              label: development.name,
              latitude: lat++,
              longitude: lng++,
              markerClickable: true,
              markerDraggable: false,
              title: development.name,
              visible: true,

            })

          }
        )
       

      })
          }
            
  
      

  onMapReady(map) {
    map.setOptions({
      fullscreenControl: 'true',

    //   fullscreenControlOptions: {
    //     position: ControlPosition.TOP_LEFT
    //   }
    });
  }

}
