import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';

import { PropertiesService } from 'app/properties.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyDetailComponent } from 'app/property-detail/property-detail.component';
import { PropertySizeComponent } from 'app/onboarding/interview/property-size/property-size.component';
import { FormControl, NumberValueAccessor } from '@angular/forms';
import { TooltipFormatter } from 'app/onboarding/interview/price/price.component';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {MatAccordion} from '@angular/material/expansion';
import { ThemePalette } from '@angular/material/core';




@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],

})
export class GalleryComponent implements OnInit {

  @ViewChild(MatAccordion, {static:false}) accordion: MatAccordion;
  
  color: ThemePalette = 'accent';
  properties: any;
  position: TooltipPosition = 'below';

  multiplex = false;
  schools = false;
  newOnly = false;
  condos = false;
  priceFrom: number;
  priceTo: number;
  mlsNum: number;
  minPrice: number;
  maxPrice: number;
  maxDom: number;
  minBeds: any;
  minBaths: any;
  address: string;
  propType: string;
  municipality: string;
  community: string;
  minLotW: number;
  minLotD: number;
  keywords: string;
  average: number;
  averageSold: number;
  count: number;
  countSold: number;
  communities: any;
  municipalities: string[];
  communityControl = new FormControl();
  municipalityControl = new FormControl();

  filteredCommunities: Observable<string[]>;
  filteredMunicipalities: Observable<string[]>;
  averageGain: any;
  sortOrderUp: boolean;
  noResultsWithSold: boolean;
  noResultsWithoutSold: boolean;
  expanded: boolean;
  unsoldCount: number;
  listToSale: number;
  averageDOM: string;
  houseCondos: string[] = ['house', 'condo'];
  selectHouseCondo: string;
  itemsSize: number;
  propertiesPriorChunk: any;
  checkedAll = true;
  disabled = false;

  constructor(private service: PropertiesService, private dialog: MatDialog, private spinner: NgxSpinnerService,
    private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {

    this.priceFrom = 90000;
    this.expanded = true;
    this.selectHouseCondo = this.houseCondos[0];
    this.municipality = 'Toronto';
    this.itemsSize = 140;

    this.communities = {"Toronto" : [
      "Dufferin Grove"
      ,
      "Palmerston-Little Italy"
      ,
      "University"
      ,
      "Bay Street Corridor"
      ,
      "Kensington-Chinatown"
      ,
      "Trinity-Bellwoods"
      ,
      "Little Portugal"
      ,
      "Niagara"
      ,
      "Waterfront Communities C1"
      ,
      "Yonge-St. Clair"
      ,
      "Casa Loma"
      ,
      "Wychwood"
      ,
      "Annex"
      ,
      "Humewood-Cedarvale"
      ,
      "Oakwood-Vaughan"
      ,
      "Forest Hill South"
      ,
      "Yonge-Eglinton"
      ,
      "Englemount-Lawrence"
      ,
      "Bedford Park-Nortown"
      ,
      "Lawrence Park North"
      ,
      "Lawrence Park South"
      ,
      "Forest Hill North"
      ,
      "Bathurst Manor"
      ,
      "Clanton Park"
      ,
      "Westminster-Branson"
      ,
      "Newtonbrook West"
      ,
      "Willowdale West"
      ,
      "Lansing-Westgate"
      ,
      "Church-Yonge Corridor"
      ,
      "North St. James Town"
      ,
      "Cabbagetown-South St. James Town"
      ,
      "Regent Park"
      ,
      "Moss Park"
      ,
      "Waterfront Communities C8"
      ,
      "Rosedale-Moore Park"
      ,
      "Mount Pleasant West"
      ,
      "Mount Pleasant East"
      ,
      "Leaside"
      ,
      "Thorncliffe Park"
      ,
      "Flemingdon Park"
      ,
      "St. Andrew-Windfields"
      ,
      "Bridle Path-Sunnybrook-York Mills"
      ,
      "Parkwoods-Donalda"
      ,
      "Banbury-Don Mills"
      ,
      "Victoria Village"
      ,
      "Newtonbrook East"
      ,
      "Willowdale East"
      ,
      "Bayview Woods-Steeles"
      ,
      "Hillcrest Village"
      ,
      "Pleasant View"
      ,
      "Don Valley Village"
      ,
      "Bayview Village"
      ,
      "Henry Farm"
      ,
      "North Riverdale"
      ,
      "Blake-Jones"
      ,
      "Greenwood-Coxwell"
      ,
      "South Riverdale"
      ,
      "Woodbine Corridor"
      ,
      "East End-Danforth"
      ,
      "The Beaches"
      ,
      "O'Connor-Parkview"
      ,
      "East York"
      ,
      "Broadview North"
      ,
      "Danforth Village-East York"
      ,
      "Crescent Town"
      ,
      "Danforth"
      ,
      "Playter Estates-Danforth"
      ,
      "Woodbine-Lumsden"
      ,
      "Wexford-Maryvale"
      ,
      "Dorset Park 1"
      ,
      "Kennedy Park"
      ,
      "Ionview"
      ,
      "Clairlea-Birchmount"
      ,
      "Steeles"
      ,
      "L'Amoreaux"
      ,
      "Tam O'Shanter-Sullivan"
      ,
      "Oakridge"
      ,
      "Birchcliffe-Cliffside"
      ,
      "Milliken"
      ,
      "Agincourt North"
      ,
      "Agincourt South-Malvern West"
      ,
      "Guildwood"
      ,
      "Scarborough Village"
      ,
      "Eglinton East"
      ,
      "Cliffcrest"
      ,
      "Bendale"
      ,
      "Woburn"
      ,
      "Morningside"
      ,
      "Rouge E10"
      ,
      "Highland Creek"
      ,
      "Centennial Scarborough"
      ,
      "West Hill"
      ,
      "Rouge E11"
      ,
      "Malvern"
      ,
      "High Park-Swansea"
      ,
      "Roncesvalles"
      ,
      "South Parkdale"
      ,
      "Junction Area"
      ,
      "Runnymede-Bloor West Village"
      ,
      "Lambton Baby Point"
      ,
      "High Park North"
      ,
      "Dovercourt-Wallace Emerson-Junction"
      ,
      "Rockcliffe-Smythe"
      ,
      "Keelesdale-Eglinton West"
      ,
      "Caledonia-Fairbank"
      ,
      "Corso Italia-Davenport"
      ,
      "Weston-Pellam Park"
      ,
      "Humberlea-Pelmo Park W4"
      ,
      "Maple Leaf"
      ,
      "Rustic"
      ,
      "Weston"
      ,
      "Brookhaven-Amesbury"
      ,
      "Yorkdale-Glen Park"
      ,
      "Briar Hill-Belgravia"
      ,
      "Beechborough-Greenbrook"
      ,
      "Mount Dennis"
      ,
      "Humber Summit"
      ,
      "Black Creek"
      ,
      "York University Heights"
      ,
      "Glenfield-Jane Heights"
      ,
      "Humbermede"
      ,
      "Humberlea-Pelmo Park W5"
      ,
      "Downsview-Roding-CFB"
      ,
      "Mimico"
      ,
      "New Toronto"
      ,
      "Long Branch"
      ,
      "Alderwood"
      ,
      "Stonegate-Queensway"
      ,
      "Edenbridge-Humber Valley"
      ,
      "Princess-Rosethorn"
      ,
      "Eringate-Centennial-West Deane"
      ,
      "Markland Wood"
      ,
      "Etobicoke West Mall"
      ,
      "Islington-City Centre West"
      ,
      "Kingsway South"
      ,
      "Kingsview Village-The Westway"
      ,
      "Willowridge-Martingrove-Richview"
      ,
      "Humber Heights"
      ,
      "West Humber-Clairville"
      ,
      "Thistletown-Beaumonde Heights"
      ,
      "Rexdale-Kipling"
      ,
      "Elms-Old Rexdale"
      ,
      "Mount Olive-Silverstone-Jamestown"

    ]};


    this.municipalities = [
      'Toronto',
      'Addington Highlands',
      'Adelaide Metcalfe',
      'Adjala-Tosorontio',
      'Admaston/Bromley',
      'Ajax',
      'Alderville First Nation',
      'Alfred & Plantagenet',
      'Algoma Remote Area',
      'Algonquin Highlands',
      'Alma',
      'Alnwick/Haldimand',
      'Amaranth',
      'Amherstburg',
      'Antigua',
      'Armour',
      'Arnprior',
      'Arran-Elderslie',
      'Ashfield-Colborne-Wawanosh',
      'Asphodel-Norwood',
      'Assiginack',
      'Athens',
      'Augusta',
      'Aurora',
      'Aylmer',
      'Baldwin',
      'Bancroft',
      'Barbados',
      'Barrie',
      'Bayham',
      'Beckwith',
      'Belleville',
      'Billings',
      'Black River-Matheson',
      'Blandford-Blenheim',
      'Blind River',
      'Blue Mountains',
      'Bluewater',
      'Bonfield',
      'Bonnechere Valley',
      'Bracebridge',
      'Bradford West Gwillimbury',
      'Brampton',
      'Brant',
      'Brantford',
      'Brighton',
      'Brock',
      'Brockton',
      'Brockville',
      'Brooke-Alvinston',
      'Bruce Mines',
      'Brudenell, Lyndoch and Ragl',
      'Burk\'s Falls',
      'Burlington',
      'Burpee & Mills',
      'Caledon',
      'Callander',
      'Calvin',
      'Cambridge',
      'Carleton Place',
      'Carling',
      'Carlow/Mayo',
      'Casselman',
      'Cavan Monaghan',
      'Cayman Islands',
      'Central Elgin',
      'Central Frontenac',
      'Central Huron',
      'Central Manitoulin',
      'Centre Hastings',
      'Centre Wellington',
      'Chamberlain',
      'Champlain',
      'Chapleau',
      'Chapple',
      'Charlton and Dack',
      'Chatham-Kent',
      'Chatsworth',
      'Chilliwack',
      'Chisholm',
      'Christian Island 30',
      'Clarence-Rockland',
      'Clarington',
      'Clearview',
      'Cobalt',
      'Cobourg',
      'Cochrane',
      'Cochrane Remote Area',
      'Coleman',
      'Collingwood',
      'Conmee',
      'Cornwall',
      'Costa Rica',
      'Cramahe',
      'Curve Lake First Nation 35',
      'Dawn-Euphemia',
      'Dawson',
      'Deep River',
      'Deseronto',
      'Dominican',
      'Dorion',
      'Douro-Dummer',
      'Drummond/North Elmsley',
      'Dryden',
      'Dutton/Dunwich',
      'Dysart et al',
      'East Ferris',
      'East Garafraxa',
      'East Gwillimbury',
      'East Hawkesbury',
      'East Luther Grand Valley',
      'East Zorra-Tavistock',
      'Edwardsburgh/Cardinal',
      'Egypt',
      'Elizabethtown-Kitley',
      'Elliot Lake',
      'Enniskillen',
      'Erin',
      'Espanola',
      'Essa',
      'Essex',
      'Faraday',
      'First Nations',
      'Florida  Usa',
      'Fort Erie',
      'Fort Frances',
      'French River',
      'Front of Yonge',
      'Frontenac Islands',
      'Galway-Cavendish and Harvey',
      'Gananoque',
      'Gauthier',
      'Georgian Bay',
      'Georgian Bluffs',
      'Georgina',
      'Georgina Islands',
      'Gillies',
      'Goderich',
      'Gordon/Barrie Island',
      'Gore Bay',
      'Gravenhurst',
      'Greater Madawaska',
      'Greater Napanee',
      'Greater Sudbury',
      'Greece',
      'Greenstone',
      'Grey Highlands',
      'Grimsby',
      'Guelph',
      'Guelph/Eramosa',
      'Haldimand',
      'Halton Hills',
      'Hamilton',
      'Hamilton Township',
      'Hanover',
      'Harley',
      'Harris',
      'Hastings Highlands',
      'Havelock-Belmont-Methuen',
      'Hawkesbury',
      'Hearst',
      'Highlands East',
      'Hornepayne',
      'Horton',
      'Howick',
      'Huntsville',
      'Huron East',
      'Huron Shores',
      'Huron-Kinloss',
      'Ignace',
      'Ingersoll',
      'Innisfil',
      'Iroquois Falls',
      'Jamaica',
      'James',
      'Johnson',
      'Joly',
      'Kapuskasing',
      'Kawartha Lakes',
      'Kearney',
      'Kelowna',
      'Kenora',
      'Kenora Remote Area',
      'Killaloe, Hagarty & Richard',
      'Killarney',
      'Kincardine',
      'King',
      'Kingston',
      'Kingsville',
      'Kirkland Lake',
      'Kitchener',
      'Laird',
      'Lake of Bays',
      'Lake of the Woods',
      'Lakeshore',
      'Lambton Shores',
      'Lanark Highlands',
      'Larder Lake',
      'Largo, Florida',
      'LaSalle',
      'Latchford',
      'Laurentian Hills',
      'Leamington',
      'Leeds & the Thousand Island',
      'Limerick',
      'Lincoln',
      'London',
      'Loyalist',
      'Lucan Biddulph',
      'Macdonald, Meredith & Aberd',
      'Machar',
      'Machin',
      'Madawaska Valley',
      'Madoc',
      'Magnetawan',
      'Malahide',
      'Manitoulin Remote Area',
      'Mapleton',
      'Marathon',
      'Markham',
      'Markstay-Warren',
      'Marmora and Lake',
      'Matachewan',
      'Mattawa',
      'Mattice-Val Cote',
      'McDougall',
      'McGarry',
      'McKellar',
      'McMurrich/Monteith',
      'McNab/Braeside',
      'Meaford',
      'Melancthon',
      'Merrickville-Wolford',
      'Mexico',
      'Middlesex Centre',
      'Midland',
      'Milton',
      'Minden Hills',
      'Minto',
      'Mississauga',
      'Mississippi Mills',
      'Mono',
      'Montague',
      'Moonbeam',
      'Moosonee',
      'Morris-Turnberry',
      'Mulmur',
      'Muskoka Lakes',
      'Nairn & Hyman',
      'Nation',
      'Neebing',
      'New Brunswick',
      'New Tecumseth',
      'Newbury',
      'Newmarket',
      'Niagara Falls',
      'Niagara-on-the-Lake',
      'Nipigon',
      'Nipissing',
      'Nipissing Remote Area',
      'Norfolk',
      'North Algona Wilberforce',
      'North Bay',
      'North Dumfries',
      'North Dundas',
      'North Frontenac',
      'North Glengarry',
      'North Grenville',
      'North Huron',
      'North Kawartha',
      'North Middlesex',
      'North Perth',
      'North Stormont',
      'Northeastern Manitoulin and',
      'Northern Bruce Peninsula',
      'Norwich',
      'Oakville',
      'Oil Springs',
      'Oliver Paipoonge',
      'Orangeville',
      'Orillia',
      'Oro-Medonte',
      'Oshawa',
      'Otonabee-South Monaghan',
      'Ottawa',
      'Out of Area',
      'Owen Sound',
      'Panama',
      'Papineau-Cameron',
      'Parry Sound',
      'Parry Sound Remote Area',
      'Pelee',
      'Pelham',
      'Pembroke',
      'Penetanguishene',
      'Perry',
      'Perth',
      'Perth East',
      'Perth South',
      'Petawawa',
      'Peterborough',
      'Petrolia',
      'Pickering',
      'Plummer Additional',
      'Plympton-Wyoming',
      'Point Edward',
      'Port Colborne',
      'Port Hope',
      'Port St. Lucie',
      'Portugal',
      'Powassan',
      'Prescott',
      'Prince',
      'Prince Edward County',
      'Prince Edward Island',
      'Punjab',
      'Puslinch',
      'Quebec',
      'Quinte West',
      'Rainy River',
      'Rama First Nation 32',
      'Ramara',
      'Red Lake',
      'Renfrew',
      'Richmond Hill',
      'Rideau Lakes',
      'Roma/Italy',
      'Romania',
      'Russell',
      'Ryerson',
      'Sables-Spanish Rivers',
      'Saint George',
      'Sarasota',
      'Sarnia',
      'Saugeen Shores',
      'Sault Ste Marie',
      'Schreiber',
      'Scugog',
      'Scugog 34',
      'Seguin',
      'Severn',
      'Shelburne',
      'Sioux Lookout',
      'Smith-Ennismore-Lakefield',
      'Smiths Falls',
      'Smooth Rock Falls',
      'South Algonquin',
      'South Bruce',
      'South Bruce Peninsula',
      'South Dundas',
      'South Frontenac',
      'South Glengarry',
      'South Huron',
      'South River',
      'South Stormont',
      'South-West Oxford',
      'Southgate',
      'Southwest Middlesex',
      'Southwold',
      'Spain',
      'Spanish',
      'Springwater',
      'St. Catharines',
      'St. Charles',
      'St. Clair',
      'St. Marys',
      'St. Thomas',
      'Stirling-Rawdon',
      'Stone Mills',
      'Stratford',
      'Strathroy-Caradoc',
      'Strong',
      'Sudbury Remote Area',
      'Sundridge',
      'Tarbutt & Tarbutt Additiona',
      'Tay',
      'Tay Valley',
      'Tecumseh',
      'Tehkummah',
      'Temagami',
      'Temiskaming Shores',
      'Terrace Bay',
      'Thames Centre',
      'The Archipelago',
      'The North Shore',
      'Thessalon',
      'Thorold',
      'Thunder Bay',
      'Thunder Bay Remote Area',
      'Tillsonburg',
      'Timiskaming Remote Area',
      'Timmins',
      'Tiny',
      'Tobago',
      'Toronto',
      'Trent Hills',
      'Trinidad',
      'Tudor & Cashel',
      'Tweed',
      'Tyendinaga',
      'Uxbridge',
      'Val Rita-Harty',
      'Vaughan',
      'Wainfleet',
      'Warwick',
      'Wasaga Beach',
      'Waterloo',
      'Wawa',
      'Welland',
      'Wellesley',
      'Wellington North',
      'West Elgin',
      'West Grey',
      'West Lincoln',
      'West Nipissing',
      'West Perth',
      'Westport',
      'Whitby',
      'Whitchurch-Stouffville',
      'White River',
      'Whitestone',
      'Whitewater Region',
      'Wilmot',
      'Windsor',
      'Wollaston',
      'Woodstock',
      'Woolwich',
      'Zorra',
    ]

    this.filteredCommunities = this.communityControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCommunities(value))
      );
      
      this.filteredMunicipalities = this.municipalityControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterMunicipalities(value))
      );
  }

  

  private _filterCommunities(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.communities.Toronto.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filterMunicipalities(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.municipalities.filter(option => option.toLowerCase().includes(filterValue));
  }

  getAddress() {
    this.address = "";
    this.spinner.show();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords);
        this.service.getAddress(position.coords.latitude, position.coords.longitude, 0).subscribe(val => {
          this.address = val[0].shortAddress;
          this.spinner.hide();
        });

      });
    }
  }
  priceSort() {
    this.sortOrderUp = !this.sortOrderUp;
    var byPrice;
    if (!this.checkedAll) { 
      byPrice = this.propertiesPriorChunk.filter(prop => prop.star != "D" && prop.star != "Y");
    } else {
      byPrice = this.propertiesPriorChunk.slice(0);
    }
   
    console.log('bps', byPrice);
    if (this.sortOrderUp) {
      byPrice.sort(function (a, b) {
        return a.lp_dol - b.lp_dol;
      });
    } else {
      byPrice.sort(function (a, b) {
        return b.lp_dol - a.lp_dol;
      });
    }
    console.log('aps', byPrice);
    this.properties = this.chunkArrayInGroups(byPrice, 3);

  }

  dateSort() {
    var byDate;
    if (!this.checkedAll) { 
      byDate = this.propertiesPriorChunk.filter(prop => prop.star != "D" && prop.star != "Y");
    } else {
       byDate = this.propertiesPriorChunk.slice(0);
    }

    if (this.sortOrderUp) {
      byDate.sort(function (a, b) {
        let d1 = new Date(a.added).getTime();
        let d2 = new Date(b.added).getTime();
        return d2 - d1;
      });
    } else {
      byDate.sort(function (a, b) {
        let d1 = new Date(a.added).getTime();
        let d2 = new Date(b.added).getTime();
        return d1 - d2;
      });
    }
    this.sortOrderUp = !this.sortOrderUp;
    if (!this.checkedAll) { }
    this.properties = this.chunkArrayInGroups(byDate, 3);

  }

  freshChange() {
    this.checkedAll = !this.checkedAll;
    let props;

    this.setProperties();

  }

  setProperties() {
    this.spinner.show();
    if (!this.checkedAll) {
      this.properties = this.chunkArrayInGroups(this.propertiesPriorChunk.filter(prop => prop.star != "D" && prop.star != "Y"), 3)
    } else {
      this.properties = this.chunkArrayInGroups(this.propertiesPriorChunk, 3);
    }
    this.spinner.hide();
  }

  show(property) {
    // fresh will only show the fresh listings on the market. user (dis)liked a listing, it won't show
    if (!this.checkedAll) {
      if (property.star == "Y" || property.star == "D") {
        return false;
      } else {
        return true;
      }

    } else {
      return true

    }



  }

  go() {

    if(this.municipality!=="Toronto" && this.community){
      alert("Sorry, Commnunity selection is only available for Toronto Municipality.\n "+this.municipality+" and "+this.community+ " is not a valid combination."); 
      return;
    }

    this.accordion.closeAll();
    this.expanded = false;
    this.average = null;
    this.averageSold = null;
    this.properties = [];
    let params = {
      maxPrice: this.priceTo,
      minPrice: this.priceFrom,
      lotWidth: this.minLotW,
      lotDepth: this.minLotD,
      keywords: this.keywords,
      municipality: this.municipality,
      maxDOM: this.maxDom,
      community: this.community,
      address: this.address,
      mls: this.mlsNum,
      plex: this.multiplex,
      schools: this.schools,
      condoOrHouse: this.selectHouseCondo,
      beds: this.minBeds,
      type: this.propType,
      baths: this.minBaths,
      newOnly: this.newOnly,
    }

    this.spinner.show();
    this.service.propertiesRadar(params).subscribe(
      response => {
        let props;
        this.propertiesPriorChunk = response[1];
        this.setProperties();
        this.average = response[0][0].averageList;
        this.unsoldCount = response[0][0].unsoldCount;
        this.averageSold = response[0][0].averageSold;
        this.count = response[0][0].listed
        this.countSold = response[0][0].sold
        this.averageDOM = response[0][0].averageDOM.toFixed(0);
        if (this.average > 0)
          this.averageGain = Math.round(this.averageSold / this.average * 10) / 10;
        this.listToSale = Math.round((this.unsoldCount) / this.countSold * 100) / 100;
        //nothing found, nothing sold
        if (response[1].length == 0 && this.countSold == 0) {
          this.noResultsWithoutSold = true;
        } else {
          this.noResultsWithoutSold = false;
        }
        //nothing found right now, but there were sales in last year
        if (response[1].length == 0 && this.countSold > 0) {
          this.noResultsWithSold = true;
        } else {
          this.noResultsWithSold = false;

        }
        this.spinner.hide();
      },
      err => { this.spinner.hide(); }

    )

  }

  chunkArrayInGroups(arr, size) {
    var myArray = [];
    for (var i = 0; i < arr.length; i += size) {
      myArray.push(arr.slice(i, i + size));
    }
    return myArray;
  }

  getPropertyIcon(property) {
    if (property.marketingMessage) {
      return 'assets/info.svg'
    }
    return 'https://s3.amazonaws.com/mlspicz/' + property.ml_num + '-1'
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
  imageError($event) {
    $event.target.src = 'assets/coming.png';
  }
  onSwipe(evt, property) {


    const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left') : '';
    const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';
    if (x === 'left') {
      console.log('remove', property.addr)
      this.service.remove(property);
    }
    if (x === 'right') {
      this.showDetail(property);
    }
  }

  communityChanged(){
    alert('CC')
  }

}