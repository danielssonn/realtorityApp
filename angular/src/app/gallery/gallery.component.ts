import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig, TooltipPosition } from '@angular/material';
import { PropertiesService } from 'app/properties.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyDetailComponent } from 'app/property-detail/property-detail.component';
import { PropertySizeComponent } from 'app/onboarding/interview/property-size/property-size.component';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],

})
export class GalleryComponent implements OnInit {

  properties: any;
  position : TooltipPosition = 'below';

  constructor(private service: PropertiesService, private dialog: MatDialog, private spinner: NgxSpinnerService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.spinner.show();
    this.route.queryParams
      .subscribe(params => {
        // {order: "popular"}
        this.spinner.show();
        this.service.propertiesRadar(params).subscribe(
          response => {
            this.properties = response.filter(prop=>{
              if(prop.star=='N' || prop.star=='Y'){
                return false;
              } else {
                return true;
              }
             
            });
            console.log('props', this.properties)
            this.spinner.hide();
          },
          err => { this.spinner.hide(); }

        )
      });
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
