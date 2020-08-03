
import { of as observableOf, Subscription } from 'rxjs';

import { map, reduce } from 'rxjs/operators';
import { Injectable, Inject, Output } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';
import { environment } from '../environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http'

import { Observable } from 'rxjs/Rx';
import { EventEmitter } from 'events';
import { DeviceService } from './device.service';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { getTreeControlFunctionsMissingError } from '@angular/cdk/tree';
import { Client } from './client-manager/client-manager-search/client';
import { Http } from '@angular/http';


interface Community {
  community: string;
  y: string;
  x: string;
  show: string;

}

@Injectable()
export class PropertiesService {


  private propertiesUrlWeek;
  private developmentsUrl;
  private propertiesRadarUrl;

  private geocodeURL;
  private permitsUrl;
  private propertiesUrlDay;
  private propertiesUrl;
  private zonesUrl;
  private addCommentUrl;
  private marketingMessageUrl;
  private schoolsUrl;
  private schoolsDistricts;
  private salesUrl;


  private propertiesUrlDetail;
  private propertiesUrlFavorite;
  private manageUrl;
  private communitiesUrl;
  private communitiesScoreUrl;
  private communityMatchURL;

  private propertiesUrlTrashbin;
  private propertiesUrlEmptyTrash;

  private properties;
  private propertiesOnRadar;
  private weeklyProperties;
  private developmentProperties;
  private permitsList;
  private zonesList;
  private schoolsList;

  private addWeeks = 2;


  private dailyProperties;
  private marketingMessage;
  private userPreferences;
  private favoriteProperties;
  private trashbinProperties;



  private selectedProperty;
  private communitiesList;

  private preferredAreas;
  private preferredBedrooms;
  private preferredBathrooms;
  private preferredPrice;
  private preferredProperty;

  private scrollPosition;


  private options


  constructor(@Inject('windowObject') private window: Window, private http: HttpClient,
    private deviceService: DeviceService) {

    this.propertiesUrlWeek = environment.serverURL + '/thisweek';
    this.propertiesUrl = environment.serverURL + '/properties?location=0';
    this.propertiesUrlDay = environment.serverURL + '/thisday';
    this.propertiesUrlDetail = environment.serverURL + '/properties?ml_num=';
    this.manageUrl = environment.serverURL + '/star';
    this.propertiesUrlFavorite = environment.serverURL + '/myfavorites';
    this.propertiesUrlTrashbin = environment.serverURL + '/mytrash';
    this.propertiesUrlEmptyTrash = environment.serverURL + '/emptytrash';
    this.communitiesUrl = environment.serverURL + '/communityBounds';
    this.communitiesScoreUrl = environment.serverURL + '/communityScores';
    this.salesUrl = environment.serverURL + '/sales'

    this.developmentsUrl = environment.serverURL + '/developments';
    this.preferredAreas = environment.serverURL + '/preferredAreas';
    this.permitsUrl = environment.serverURL + '/permits';
    this.preferredBedrooms = environment.serverURL + '/preferredBedrooms';
    this.preferredBathrooms = environment.serverURL + '/preferredBathrooms';
    this.preferredPrice = environment.serverURL + '/preferredPrice';
    this.preferredProperty = environment.serverURL + '/userPreferences';
    this.addCommentUrl = environment.serverURL + '/addComment'
    this.marketingMessageUrl = environment.serverURL + '/marketingMessage'
    this.schoolsUrl = environment.serverURL + '/schools'
    this.schoolsDistricts = environment.serverURL + '/schoolsDistricts'
    this.propertiesRadarUrl = environment.serverURL + '/propertiesRadar'
    this.communityMatchURL = environment.serverURL + '/communitymatch';
     
    this.geocodeURL = environment.serverURL + '/address';
     

    this.zonesUrl = '/assets/ZoningTO_simplified.json';

    const headers = new Headers();
    headers.append('Content-Type', 'x-application/json');

    this.options = new RequestOptions({ headers: headers, withCredentials: true });
    this.scrollPosition = 0;

  }

  setScrollPosition(val) {
    this.scrollPosition = val;
  }
  getScrollPosition() {
    return this.scrollPosition;
  }

  setSelectedProperty(property) {
    this.selectedProperty = property;
  }

  clearCachedProperties() {
    this.dailyProperties = null;
    this.weeklyProperties = null;
    this.favoriteProperties = false;
  }

  clearUserPreferences() {

    this.userPreferences = false;
  }


  getPropertyMarker(property) {
    const condoMarker = '/assets/condo_marker.png';
    const houseMarker = '/assets/house_marker.png';
    const townHouseMarker = '/assets/townhouse_marker.png';
    const semiMarker = '/assets/semi_marker.png';

    let markerIcon;
    if (property.type_own1_out === 'Detached' || property.type_own1_out === 'Det Condo') {
      markerIcon = houseMarker

    } else if (property.type_own1_out === 'Condo Apt' ||
      property.type_own1_out === 'Leasehold Condo' ||
      property.type_own1_out === 'Co-Op Apt' ||
      property.type_own1_out === 'Comm Element Condo' ||
      property.type_own1_out === 'Co-Ownership Apt') {
      markerIcon = condoMarker;
    } else if (property.type_own1_out === 'Semi-Det Condo' ||
      property.type_own1_out === 'Semi-Detached') {
      markerIcon = semiMarker;
    } else if (property.type_own1_out === 'Att/Row/Twnhouse' ||
      property.type_own1_out === 'Condo Townhouse' ||
      property.type_own1_out === 'Triplex' ||
      property.type_own1_out === 'Fourplex' ||
      property.type_own1_out === 'Multiplex') {

      markerIcon = townHouseMarker;


    } else {
      markerIcon = houseMarker;
    }
    return markerIcon;
  }

  addWeek(): boolean {
    if (this.addWeeks < 20) {
      this.addWeeks++;
      return true;
    } else {
      return false;

    }

  }

  getAddWeeks() {
    return this.addWeeks;
  }


  weekly(refresh: boolean): Observable<any[]> {

    if (!refresh && this.weeklyProperties) {
      return observableOf(this.weeklyProperties);
    } else {
      return this.http.get(this.propertiesUrlWeek, {

        params: new HttpParams().set('addWeek', this.addWeeks.toString())
          .set('language', this.deviceService.getLanguage().toString())
      }).pipe(
        map(response => {

          this.weeklyProperties = response;
          return this.weeklyProperties;

        }));
    }
  }

  daily(refresh: boolean): Observable<any[]> {
    if (!refresh && this.dailyProperties) {
      return observableOf(this.dailyProperties);
    } else {

      return this.http.get(this.propertiesUrlDay).pipe(
        map(response => {
          if (!response || !response[0]) {
            return [];
          }
          this.dailyProperties = response;
          // this.dailyProperties.unshift();
          // this.dailyProperties.push({
          //   added: "2019-08-14T02:31:50.000Z", id: 3, languageId: 1, marketingMessage: '1212121', ml_num: 'mkt',
          //   longMessage: '{"data": {"key":"123", "map": {"zoom":"11", "lat":"43.653908", "lon":"-79.384293" }, "imgUrl1":"https://hmhpics.s3.amazonaws.com/TOPercentageTopDetached.png?versionId=null","imgLegend1":"Percentage growth", "imgLegend2":"Price Growth", "imgUrl2":"https://hmhpics.s3.amazonaws.com/TOPercentageTopDetached.png?versionId=null" ,"title":"The Most Appreciated Communities for Detached houses 2015-2019", "textAbove":" Wondering which neighbourhoods are the hottest in Toronto? Where would your equity grow the best? See the map and the price growth charts below to find where to buy!", "textBelow":"Source: Toronto Real Estate Board (TREB)", "callToAction":"Do It!"}}'
          // })
          return this.dailyProperties;

        }));
    }
  }


  details(property): Observable<any[]> {
    return observableOf(this.selectedProperty)
    // return this.http.get(this.propertiesUrlDetail + ml_num)
    //   .map(response => {
    //     return response.json();

    //   });
  }

  async saveBedrooms(bedrooms) {
    return this.http.post(this.preferredProperty, bedrooms).pipe(map(response => {
      this.userPreferences = false;
      return response;
    })).subscribe();
  }
  async saveSchools(schools) {
    return this.http.post(this.preferredProperty, schools).pipe(map(response => {
      this.userPreferences = false;
      return response;
    })).subscribe();

  }

  async saveParking(parking) {
    return this.http.post(this.preferredProperty, { parking: parking }).pipe(map(response => {
      this.userPreferences = false;
      return response;
    })).subscribe();
  }

  async savePriceRange(range) {
    return this.http.post(this.preferredProperty, range).pipe(map(response => {
      this.userPreferences = false;
      return response;
    })).subscribe();
  }

  async saveBathrooms(bathrooms) {
    return this.http.post(this.preferredProperty, bathrooms).pipe(map(response => {
      this.userPreferences = false;
      return response;
    })).subscribe();
  }


  weeklyReset() {
    this.weeklyProperties = null;

  }
  dailyReset() {
    this.weeklyProperties = null;

  }

  async savePropertyType(propertyTypes) {
    return this.http.post(this.preferredProperty, propertyTypes).pipe(map(response => {
      this.userPreferences = false;
    })).toPromise();
  }


  saveAreas(locations) {
    this.dailyReset();
    this.weeklyReset();
    return this.http.post(this.preferredAreas, locations).toPromise();
  }

  getAreas(): Observable<any> {
    return this.http.get(this.preferredAreas, this.options).pipe(map(response => {
      return response;
    }))

  }

  getSchoolsAndDistricts(): Observable<any> {
    return this.http.get(this.schoolsDistricts, this.options).pipe(map(response => {
      return observableOf(response);
    }))

  }

  getUserPreferences(): Observable<any> {

    if (this.userPreferences) {
      return observableOf(this.userPreferences);
    } else {

      return this.http.get(this.preferredProperty, this.options).pipe(map(response => {
        this.userPreferences = response

        return response;
      }))
    }
  }


  developments(): Observable<any> {
    if (this.developmentProperties) {
      return observableOf(this.developmentProperties);
    } else {
      return this.http.get(this.developmentsUrl, this.options).pipe(
        map(response => {
          // make markers from development properties
          this.developmentProperties = [];
          response[1].json().forEach(
            development => {
              const geo = development.geo.split(',');
              let lat = geo[0];
              let lng = geo[1];

              this.developmentProperties.push({
                iconUrl: '/assets/proposals/Detached House.svg_32x32.png',
                label: development.name,
                latitude: lat++,
                longitude: lng++,
                markerClickable: true,
                markerDraggable: false,
                title: development.name,
                visible: true,
                category: development.category,
                status: development.status,
                units: development.units
              })

            }
          )
          return this.developmentProperties;

        }));
    }
  }

  propertiesRadar(params): Observable<any> {
    if (false) {
      return observableOf(this.propertiesOnRadar);
    } else {

      this.options.params = { beds: 3, lotWidth: 20, schools: 1, maxPrice: 1700000, municipality: 'toronto', type: 'detached' };
      this.options.params = params;
      let pSign;
      if (params.beds) {
        pSign = params.beds.indexOf('+');
        if (pSign > 0) {
          params.beds = params.beds.substring(0, pSign) + 'a'
        }
      }
      if(params.baths){
        pSign = params.baths.indexOf('+');
        if (pSign > 0) {
          params.baths = params.baths.substring(0, pSign) + 'a'
        } 
        
      }


      return this.http.get(this.propertiesRadarUrl, this.options).pipe(
        map(response => {
          let rr: any = response[1];
          let soldProps: any = response[0]
          // make markers from development properties
          this.propertiesOnRadar = [[], []];

          let sumListed = 0;
          let sumSold = 0;
          let countSold = 0;
          let countUnSold = 0;
          let sumDOM = 0;

          rr.forEach(
            prop => {
              const geo = prop.geo.split(',');
              let lat = geo[0];
              let lng = geo[1];

              prop.markerClickable = true;
              prop.markerDraggable = false;
              prop.title = prop.name;
              prop.visible = true;
              prop.latitude = lat++;
              prop.longitude = lng++;
              if (prop.star) {
                prop.icon = "/assets/newPlace.svg"
              } else {
                prop.icon = "/assets/oldPlace.svg"

              }
              sumListed = sumListed + prop.lp_dol;
             
              this.propertiesOnRadar[1].push(prop)
              
              sumDOM = sumDOM+ prop.dom;

            }
          )
          soldProps.forEach(sold => {
            sumDOM = sumDOM + sold.dom;
            if(sold.lsc === 'Sld'){
              sumSold = sumSold + sold.sp_dol
              countSold++;
            }
            if(sold.lsc !== 'Sld' && sold.lsc !== 'New'  && sold.lsc !== 'Sc'){
              countUnSold++;
            }
          })

          let averageListed = sumListed / rr.length;
          let averageSold = sumSold / countSold;
          let averageDOM = sumDOM/(rr.length+countSold);

          this.propertiesOnRadar[0].push({ averageDOM:averageDOM, unsoldCount: countUnSold, averageList: averageListed, listed: rr.length, sold: countSold, averageSold: averageSold })
          return this.propertiesOnRadar;

        }));
    }
  }

  getAddress(lat, lon, radius): Observable<any>{
    console.log('getting address')
  
    
     let params = {
        lat:lat,
        lon:lon,
        radius: radius
      } 
     this.options.params = params; 
   
    return this.http.get(this.geocodeURL,  this.options).pipe(map(
      response => {
        return response;

      }))

  }

  getCommunityMatch(lat, lon, zoom, address): Observable<any>{
    let params = {
      lat:lat,
      lon:lon,
      zoom:zoom,
      address:address
    } 
   this.options.params = params; 
 
  return this.http.get(this.communityMatchURL,  this.options).pipe(map(
    response => {
      return response;

    }))

  }

  getSales(address):Observable<any>{
    let params = {
      address:address,
      
    } 
   this.options.params = params; 
 
  return this.http.get(this.salesUrl,  this.options).pipe(map(
    response => {
      return response;

    }))

  }

  permits(): Observable<any> {
    if (this.permitsList) {
      return observableOf(this.permitsList);
    } else {

      this.http.get<any[]>(this.permitsUrl)
        .subscribe(response => {
          this.permitsList = [];
          if (!response[0]) {
            return;
          }
          response.forEach(
            permit => {
              if (permit.geo) {
                const geo = permit.geo.split(',');
                let lat = geo[0];
                let lng = geo[1];

                this.permitsList.push({
                  iconUrl: '/assets/permits/Detached House.svg_32x32.png',
                  label: permit.WORK,
                  latitude: lat++,
                  longitude: lng++,
                  markerClickable: true,
                  markerDraggable: false,
                  title: permit.DESCRIPTION,
                  visible: true,
                  work: permit.work_type,
                  type: permit.PERMIT_TYPE,
                  structure: permit.STRUCTURE_TYPE,
                  street_number: permit.STREET_NUM,
                  street: permit.STREET_NAME,
                  street_type: permit.STREET_TYPE,
                  description: permit.DESCRIPTION



                })
              }
            }
          )
          return Observable.of(this.permitsList);

        });
    }
  }

  schools(): Observable<any> {
    return this.http.get(this.schoolsUrl, this.options).pipe(map(
      response => {
        this.schoolsList = [];
        response[1].json().forEach(
          school => {
            let color = 'red'
            if (school.school_type === 'E') {
              color = 'green'
            }
            const poly = {
              school: school.school_name,
              id: school.school_id,
              isEditable: false,
              paths: [],
              fill: {
                color: color
              },
              stroke: {
                color: 'red',
                weight: 3
              }

            }

            school.bounds.forEach(coords => {
              let c = []
              poly.paths.push(c);

              coords.forEach(coord => {

                if (c.find(e => e.lng === Number(coord.longitude) && e.lat === Number(coord.latitude))) {
                  // if the same coords found, add as a new poly and start over. But not for last coord
                  c.push({ lng: Number(coord.longitude), lat: Number(coord.latitude) })
                  poly.paths.push(c);
                  c = [];
                } else {
                  c.push({ lng: Number(coord.longitude), lat: Number(coord.latitude) })
                }
              })
            })
            if (poly.paths[1]) {
              poly.paths[1].reverse();

              this.schoolsList.push(poly);
            }

          }

        )
        return observableOf(this.schoolsList);
      }))

  }

  zones(): Observable<any> {

    return this.http.get(this.zonesUrl, this.options).pipe(map(
      response => {
        this.zonesList = [];
        response[1].json().features.forEach(
          feature => {
            if (feature.geometry) {
              const zoneDetail = this.getZoneDetail(feature.properties.ZN_ZONE)
              const poly = {
                zone: zoneDetail.name,
                paths: [],
                idKey: feature.properties.OBJECTID,
                id: feature.properties.OBJECTID,
                fill: {
                  color: zoneDetail.background
                },
                stroke: {
                  color: 'white',
                  weight: 1
                }
              }

              feature.geometry.coordinates.forEach(coords => {
                const c = []
                poly.paths.push(c);
                coords.forEach(coord => {
                  c.push({ lng: coord[0], lat: coord[1] })

                })
              })
              this.zonesList.push(poly);
            }
          }
        )
        return observableOf(this.zonesList);
      }))



  }

  communities(): Observable<any> {

    if (this.communitiesList) {
      return observableOf({ value: this.communitiesList })

    } else {

      // make an http call, create LatLngBounds
      return this.http.get(this.communitiesUrl, this.options).pipe(map(
        response => {
          this.communitiesList = [];

          let polyPath = [];
          let opacity = 0.0;
          let polyStroke;
          let community = '';
          opacity = 0.0;
          polyStroke = {
            color: 'white',
            weight: 1
          }


          response[1].json().forEach(
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
                    color: this.getHeatColor(value.rateAll)
                  }
                }
                this.communitiesList.push(polygon)

              } else {
                polyPath.push({
                  lat: value.latitude++,
                  lng: value.longitude++
                });

              }
            }
          )

          return observableOf(this.communitiesList);
        }

      ))

    }

  }

  async communitiesWeekly(poly): Promise<any> {

    await this.saveAreas(poly);

    let weeklyProps = await this.weekly(true).toPromise();

    return await this.communitiesScoreGeoJSON(weeklyProps);


  }

  async communitiesScoreGeoJSON(props): Promise<any> {

    let features = [];
    let geoJSON = {
      "type": "FeatureCollection",
      "features": []
    }



    let communities: any = await this.http.get(this.communitiesScoreUrl, this.options).toPromise();

    let polyPath = [];
    let opacity = 0.0;
    let polyStroke;
    let community = '';
    opacity = 0.0;
    polyStroke = {
      color: 'white',
      weight: 1
    }

    let min = 0;
    let max = 0;

    communities.forEach(
      value => {

        let heat = 0;


        if (value.community !== community) {

          props.forEach(weeklyHome => {
            if (weeklyHome.community === value.community.trim()) {
              heat++;
            }
          })

          if (heat < min) {
            min = heat;
          }
          if (heat > max) {
            max = heat;
          }

          polyPath = [];
          community = value.community;

          polyPath.push([
            value.x++,
            value.y++
          ]);
          const feature = {
            "type": "Feature",
            "properties": {

              "color": "blue",
              "rank": "7",
              "ascii": "71",
              "heat": heat
            },
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                polyPath

              ]
            }
          }

          if (heat > 0) {
            geoJSON.features.push(feature)

          }

        } else {
          polyPath.push([
            value.x++,
            value.y++
          ]);

        }
      }

    )
    this.colorGeoJSON(geoJSON, min, max);
    return geoJSON;





  }





  colorGeoJSON(communities, min, max) {

    // console.log('min/max/total', min, max, this.weeklyProperties.length)
    // console.log('band 1',max-(max/6), max)
    // console.log('band 2',max-(2*max/6), max-(max/6 ))
    // console.log('band 3',max-(3*max/6), max-(2*max/6 ))
    // console.log('band 3',max-(4*max/6), max-(3*max/6 ))
    // console.log('band 4',max-(5*max/6), max-(4*max/6 ))
    // console.log('band 5',max-(5*max/6), max-(6*max/6 ))





    communities.features.forEach(



      community => {

        //close 'er if needed
        if (community.geometry.coordinates[0][0][0] != community.geometry.coordinates[0][community.geometry.coordinates[0].length - 1][0]) {

          community.geometry.coordinates[0].push(community.geometry.coordinates[0][0]);
        }

        // console.log(community.idKey, community.heat )

        if (community.properties.heat >= max - (max / 6)) {
          community.properties.color = '#a50f15'
        }
        if (community.properties.heat > max - (2 * max / 6) && community.properties.heat <= max - (max / 6)) {
          community.properties.color = '#de2d26'
        }
        if (community.properties.heat > max - (3 * max / 6) && community.properties.heat <= max - (2 * max / 6)) {
          community.properties.color = '#fb6a4a'
        }
        if (community.properties.heat > max - (4 * max / 6) && community.properties.heat <= max - (3 * max / 6)) {
          community.properties.color = '#fc9272'
        }
        if (community.properties.heat > max - (5 * max / 6) && community.properties.heat <= max - (4 * max / 6)) {
          community.properties.color = '#fcbba1'
        }
        if (community.properties.heat > max - (6 * max / 6) && community.properties.heat <= max - (5 * max / 6)) {
          community.properties.color = '#fee5d9'
        }
      }


    )

  }



  colorHeatMap(communities, min, max) {

    // console.log('min/max/total', min, max, this.weeklyProperties.length)
    // console.log('band 1',max-(max/6), max)
    // console.log('band 2',max-(2*max/6), max-(max/6 ))
    // console.log('band 3',max-(3*max/6), max-(2*max/6 ))
    // console.log('band 3',max-(4*max/6), max-(3*max/6 ))
    // console.log('band 4',max-(5*max/6), max-(4*max/6 ))
    // console.log('band 5',max-(5*max/6), max-(6*max/6 ))





    communities.forEach(

      community => {
        // console.log(community.idKey, community.heat )

        if (community.heat >= max - (max / 6)) {
          community.fill.color = '#a50f15'
        }
        if (community.heat > max - (2 * max / 6) && community.heat <= max - (max / 6)) {
          community.fill.color = '#de2d26'
        }
        if (community.heat > max - (3 * max / 6) && community.heat <= max - (2 * max / 6)) {
          community.fill.color = '#fb6a4a'
        }
        if (community.heat > max - (4 * max / 6) && community.heat <= max - (3 * max / 6)) {
          community.fill.color = '#fc9272'
        }
        if (community.heat > max - (5 * max / 6) && community.heat <= max - (4 * max / 6)) {
          community.fill.color = '#fcbba1'
        }
        if (community.heat > max - (6 * max / 6) && community.heat <= max - (5 * max / 6)) {
          community.fill.color = '#fee5d9'
        }
      }


    )

  }

  setHeat(heatType) {
    this.communitiesList.forEach(polygon => {

      if (heatType === 'rateAll') {
        polygon.fill.color = this.getHeatColor(polygon.rateAll)

      }
      if (heatType === 'rateCondo') {
        polygon.fill.color = this.getHeatColor(polygon.rateCondo)
      }
      if (heatType === 'rateSemi') {
        polygon.fill.color = this.getHeatColor(polygon.rateSemi)
      }
      if (heatType === 'rateRowhouse') {
        polygon.fill.color = this.getHeatColor(polygon.rateRowhouse)
      }
      if (heatType === 'rateDetached') {
        polygon.fill.color = this.getHeatColor(polygon.rateDetached)
      }
    })

  }



  getHeatColor(rate) {


    return 'red';
    var h = (rate) * 240
    return "hsl(" + Math.round(h).toFixed(1) + ", 100%, 50%)";


    if (rate === 1) {

      return '#a50026';

    }
    if (rate === 2) {

      return '#d73027';

    }
    if (rate === 3) {

      return '#f46d43';

    }
    if (rate === 4) {

      return '#fdae61';

    }
    if (rate === 5) {

      return '#fee090';

    }
    if (rate === 6) {

      return '#e0f3f8';

    }
    if (rate === 7) {

      return '#abd9e9';

    }
    if (rate === 8) {

      return '#74add1';

    }
    if (rate === 9) {

      return '#4575b4';

    }
    if (rate === 10) {

      return '#313695';

    }
    return 'pink';
  }

  getCustomPropertyLabel(property) {



    if (property.type_own1_out === 'Detached') {
      return 'assets/D.png';
    } else if (property.type_own1_out === 'Condo Apt' || property.type_own1_out === 'Leasehold Condo'
      || property.type_own1_out === 'Co-Op Apt' || property.type_own1_out === 'Comm Element Condo') {
      return 'assets/C.png';
    } else if (property.type_own1_out === 'Att/Row/Twnhouse' || property.type_own1_out === 'Condo Townhouse'
      || property.type_own1_out === 'Fourplex' || property.type_own1_out === 'Triplex' ||
      property.type_own1_out === 'Multiplex' || property.type_own1_out === 'Semi-Detached') {
      return 'assets/S.png';
    } else {
      return 'assets/D.png';
    }


  }
  getZoneDetail(zone) {
    if (zone === 'R') { return { name: 'Residential', background: 'yellow' } };
    if (zone === 'RD') { return { name: 'Residential Detached', background: 'yellow' } };
    if (zone === 'RS') { return { name: 'Residential Semi Detached', background: 'yellow' } };
    if (zone === 'RT') { return { name: 'Residential Towhouse', background: 'yellow' } };
    if (zone === 'RM') { return { name: 'Residential Multiple Dwelling', background: 'yellow' } };

    if (zone === 'RA') { return { name: 'Residential Appartment', background: 'orange' } };
    if (zone === 'RAC') { return { name: 'Residential Appartment Commercial', background: 'orange' } };

    if (zone === 'O') { return { name: 'Open Space', background: 'lightgreen' } };
    if (zone === 'ON') { return { name: 'Open Space Natural', background: 'lightgreen' } };
    if (zone === 'OR') { return { name: 'Open Space Recreation', background: 'lightgreen' } };
    if (zone === 'OG') { return { name: 'Open Space Golf Course', background: 'lightgreen' } };
    if (zone === 'OM') { return { name: 'Open Space Marina', background: 'lightgreen' } };
    if (zone === 'OC') { return { name: 'Open Space Cemetery', background: 'lightgreen' } };

    if (zone === 'UT') { return { name: 'Utility and Transportation', background: 'grey' } };

    if (zone === 'CL') { return { name: 'Commercial Local', background: 'pink' } };
    if (zone === 'CR') { return { name: 'Commercial Residential', background: 'coral' } };

    if (zone === 'CRE') { return { name: 'Commercial Residential Employment', background: 'brown' } };

    if (zone === 'CR') { return { name: 'Commercial Residential', background: 'coral' } };

    if (zone === 'EL') { return { name: 'Employment Light Industrial', background: 'violet' } };
    if (zone === 'E') { return { name: 'Employment Industrial', background: 'violet' } };
    if (zone === 'EL') { return { name: 'Employment Light Industrial', background: 'violet' } };
    if (zone === 'EH') { return { name: 'Employment Heavy Industrial', background: 'violet' } };
    if (zone === 'EL') { return { name: 'Employment Light Industrial', background: 'violet' } };
    if (zone === 'EO') { return { name: 'Employment Industrial Office', background: 'violet' } };

    if (zone === 'I') { return { name: 'Institutional General', background: 'aqua' } };
    if (zone === 'IH') { return { name: 'Institutional Hospital', background: 'aqua' } };
    if (zone === 'IE') { return { name: 'Institutional Education', background: 'aqua' } };
    if (zone === 'IS') { return { name: 'Institutional School', background: 'aqua' } };
    if (zone === 'IPW') { return { name: 'Institutional Place of Worship', background: 'aqua' } };

    return { name: '', background: 'white' };


  }

  favorites(): Promise<any[]> {

    if (this.favoriteProperties) {
      return observableOf(this.favoriteProperties).toPromise();
    } else {
      return this.http.get(this.propertiesUrlFavorite, this.options).pipe(
        map(response => {
          this.favoriteProperties = response;
          return this.favoriteProperties;

        })).toPromise();
    }
  }
  trashbin(): Observable<any[]> {

    return this.http.get(this.propertiesUrlTrashbin, this.options).pipe(
      map(response => {
        if (response[1].json().length === 0) {
          this.trashbinProperties = null;
        } else {
          this.trashbinProperties = response[1].json();

        }
        return this.trashbinProperties;

      }));

  }
  emptyTrash() {


  }
  like(property, reco) {

    if (reco) {
      // this will be overwritten with actual name on the server
      property.recommendedBySalesPersonName = 'You';
    }

    if (this.favoriteProperties) {
      this.favoriteProperties.unshift(property);
    }
    if (this.dailyProperties) {
      this.dailyProperties.forEach(element => {
        if (element.ml_num === property.ml_num) {
          element.star = 'Y'
        }
      });
    }
    if (this.weeklyProperties) {
      this.weeklyProperties.forEach(element => {
        if (element.ml_num === property.ml_num) {
          element.star = 'Y'
        }
      });
    }
    property.star = 'Y';
    return this.http.post(this.manageUrl, property, this.options).pipe(map(response => {
    })).subscribe();

  }
  allProperties(): Observable<any[]> {

    if (this.properties) {
      return observableOf(this.properties);
    } else {
      return this.http.get(this.propertiesUrl, this.options).pipe(
        map(response => {
          this.properties = [];
          response[1].json().forEach(
            property => {
              const geo = property.geo.split(',');
              let lat = geo[0];
              let lng = geo[1];
              this.properties.push({

                latitude: lat++,
                longitude: lng++,
                markerClickable: true,
                markerDraggable: false,
                title: property.addr,
                visible: true,
                addr: property.addr,
                price: property.lp_dol,
                type: property.type_own1_out,
                bedrooms: property.br,
                bathrooms: property.bath_tot,
                mlnum: property.ml_num,
                options: {
                  icon: { url: this.getPropertyMarker(property) }
                },
              })
            }
          )

          return this.properties;
        }));
    }
  }

  read(property) {
    if (property.star && property.star === 'Y') {
      return;
    }
    if (property.star && property.star === 'N') {
      return;
    }

    if (this.dailyProperties) {
      this.dailyProperties.forEach(element => {
        if (element.ml_num === property.ml_num) {
          element.star = 'R'
        }
      });
    }
    if (this.weeklyProperties) {
      this.weeklyProperties.forEach(element => {
        if (element.ml_num === property.ml_num) {
          element.star = 'R'
        }
      });
    }

    property.star = 'R';
    return this.http.post(this.manageUrl, property, this.options).pipe(map(response => {

    })).subscribe();

  }

  remove(property) {
    property.star = 'D';


    if (this.dailyProperties) {
      this.dailyProperties.forEach(element => {
        if (element.ml_num === property.ml_num) {
          element.star = 'D'
        }
      });
    }
    if (this.favoriteProperties) {
      this.favoriteProperties.forEach(element => {
        if (element.ml_num === property.ml_num) {
          this.favoriteProperties.splice(this.favoriteProperties.indexOf(element), 1)
        }
      });
    }
    if (this.weeklyProperties) {
      this.weeklyProperties.forEach(element => {
        if (element.ml_num === property.ml_num) {
          element.star = 'D'
        }
      });
    }

    this.http.post(this.manageUrl, property, this.options).pipe(map(response => {

    })).subscribe()

  }

  addComment(property, comment): Observable<any> {
    property.userComment = comment;
    return this.http.post(this.addCommentUrl, property, this.options).pipe(map(response => {

    }));

  }


}
