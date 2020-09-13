import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { MarketingDirective } from './marketing.directive';
import { Marketing } from './marketing';
import { MarketingItem } from './marketingItem';
import { JustTextAdComponent } from './just-text-ad/just-text-ad.component';
import { AdWithMapComponent } from './ad-with-map/ad-with-map.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingComponent implements OnInit {
  @Input() marketingItem: any;
  @ViewChild(MarketingDirective,  {static:false}) adHost: MarketingDirective;
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

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private domSanitizer: DomSanitizer,) { }

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {

  console.log("MI", this.marketingItem)  
  let message = this.marketingItem;


  
    // // perhaps switch around components based on the input
    // let componentFactory;
    // if (message.map) {
    //   componentFactory = this.componentFactoryResolver.resolveComponentFactory(AdWithMapComponent);
    // }
    // else  {
    //    componentFactory = this.componentFactoryResolver.resolveComponentFactory(JustTextAdComponent);
    // }

    //   const viewContainerRef = this.adHost.viewContainerRef;
    //   viewContainerRef.clear();
    //   const componentRef = viewContainerRef.createComponent(componentFactory);
    //   (<Marketing>componentRef.instance).data = message.longMessage;

    }

    getInnerHTMLValue() {
        return this.domSanitizer.bypassSecurityTrustHtml(this.marketingItem.longMessage);
    }


}
