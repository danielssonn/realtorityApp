import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'app/user.service';
import { ClientProfile } from './clientProfile';
import { ClientProfileService } from './client-profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientActivityTrackingService } from '../activity/client-activity.service';
import { PropertiesService } from 'app/properties.service';

@Component({
  selector: 'app-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClientOverviewComponent implements OnInit {
  device: String;
  profile: ClientProfile;
  segment:any;
  segmentsList: any;
  segmentChanged = false;
  searchDefinition = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public client: any, private userService: UserService,
    private dialogRef: MatDialogRef<ClientOverviewComponent>,
    private clientProfielService: ClientProfileService, private activityService: ClientActivityTrackingService,
    private spinner: NgxSpinnerService, private propService:PropertiesService) { }

  ngOnInit() {
    this.device = "mobi"
    
    this.activityService.getClientSegments().subscribe(
      segs => {
        this.segmentsList = segs;
        this.segment = this.client.dataKey.segmentIndicator;
      }
    )
   

    this.setClientProfile();
  }


  segmentChange(ev){

    console.log('update sgm', ev, this.segment)
    this.userService.update({userId:this.client.dataKey.userId, segmentIndicator:this.segment}).subscribe(
      result => {
       console.log('segment update', result)
       this.segmentChanged = true;
      })
  }

  cancel() {
    if(this.segmentChanged){
      this.dialogRef.close('update')
    }
    else{
      this.dialogRef.close('close')
    }

  }
  swipe(ev) {
    this.dialogRef.close('close')
  }

  getIcon(type){
   return this.propService.getPropertyMarker(type);

  }

  setClientProfile() {

    this.spinner.show("detailSpinner");
    this.clientProfielService.getClientProfile(this.client.dataKey.userId).subscribe(
      val => { this.profile = val;
      
        if(this.profile.preferences.userId){
          this.searchDefinition = 1

          if(this.profile.preferences.priceFrom>50000){
            this.searchDefinition = 2
            if(this.profile.preferences.priceTo - this.profile.preferences.priceFrom<=1000000){
              this.searchDefinition = 3
            }
          }
        }
        this.spinner.hide("detailSpinner");
      }
    );


  }

}
