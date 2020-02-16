import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig, TooltipPosition, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { PropertiesService } from 'app/properties.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyDetailComponent } from 'app/property-detail/property-detail.component';
import { PropertySizeComponent } from 'app/onboarding/interview/property-size/property-size.component';
import { FormControl, NumberValueAccessor } from '@angular/forms';
import { TooltipFormatter } from 'app/onboarding/interview/price/price.component';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],

})
export class GalleryComponent implements OnInit {

  fresh: boolean;
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
  communities: string[];
  communityControl = new FormControl();
  filteredCommunities: Observable<string[]>;
  averageGain: any;
  sortOrderUp:boolean;
  noResultsWithSold:boolean;
  noResultsWithoutSold:boolean;

  constructor(private service: PropertiesService, private dialog: MatDialog, private spinner: NgxSpinnerService,
    private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.priceFrom = 90000;
    this.fresh = true;
    // this.sortOrderUp = true;
    this.municipality = 'Toronto'
    this.communities = [
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

    ];

    this.filteredCommunities = this.filteredCommunities = this.communityControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    // this.priceTo=600000;
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.communities.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  priceSort() {
    this.sortOrderUp = !this.sortOrderUp;


    var byPrice = this.properties.slice(0);
    if(this.sortOrderUp){
      byPrice.sort(function (a, b) {
        return a.lp_dol - b.lp_dol;
      });
    } else{
      byPrice.sort(function (a, b) {
        return b.lp_dol - a.lp_dol;
      });
    }
    
    this.properties = byPrice;
  }

  dateSort() {
    var byDate = this.properties.slice(0);
    if(this.sortOrderUp){
      byDate.sort(function (a, b) {
        let d1 = new Date(a.added).getTime();
        let d2 = new Date(b.added).getTime();
        return d2 - d1;
      });
    } else{
      byDate.sort(function (a, b) {
        let d1 = new Date(a.added).getTime();
        let d2 = new Date(b.added).getTime();
        return d1 - d2;
      });
    }
    this.sortOrderUp = !this.sortOrderUp;
    this.properties = byDate;
  
  }

  show(property) {
    // fresh will only show the fresh listings on the market. user (dis)liked a listing, it won't show
    if (this.fresh) {
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
      condos: this.condos,
      beds: this.minBeds,
      type: this.propType,
      baths: this.minBaths,
      newOnly: this.newOnly,

    }
    this.spinner.show();
    this.service.propertiesRadar(params).subscribe(
      response => {
        this.properties = response[1];

        this.average = response[0][0].averageList;
        this.averageSold = response[0][0].averageSold;
        this.count = response[0][0].listed
        this.countSold = response[0][0].sold
        this.averageGain = Math.round(this.average / this.averageSold * 10) / 10;

        //nothing found, nothing sold
        if(!this.properties[1] && !this.properties[2]){
          this.noResultsWithoutSold = true;
        } else {
          this.noResultsWithoutSold = false;
        }
        //nothing found right now, but there were sales in last year
        if(!this.properties[1] && this.properties[2]){
          this.noResultsWithSold = true;
        } else {
          this.noResultsWithSold = false;

        }
        this.spinner.hide();
      },
      err => { this.spinner.hide(); }

    )

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
      this.service.remove(property);
    }
    if (x === 'right') {
      this.showDetail(property);
    }
  }

}
