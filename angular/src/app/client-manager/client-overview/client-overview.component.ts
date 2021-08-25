import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'app/user.service';
import { ClientProfile } from './clientProfile';
import { ClientProfileService } from './client-profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientActivityTrackingService } from '../activity/client-activity.service';
import { PropertiesService } from 'app/properties.service';
import { AppConfig } from 'app/app-config';
import { DeviceService } from 'app/device.service';
import { FormControl } from '@angular/forms';
import { CoolLocalStorage } from '@angular-cool/storage';


declare var sms: any;

@Component({
  selector: 'app-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClientOverviewComponent implements OnInit {
  device: String;
  profile: ClientProfile;
  segment: any;
  segmentsList: any;
  segmentChanged = false;
  searchDefinition = 0;
  emailSubject: string;
  lastInteractionDate: any;
  salesPersonId:any;
  


  constructor(@Inject(MAT_DIALOG_DATA) public client: any, private userService: UserService,
    private dialogRef: MatDialogRef<ClientOverviewComponent>, private session: CoolLocalStorage,
    private clientProfielService: ClientProfileService, private activityService: ClientActivityTrackingService,
    private spinner: NgxSpinnerService, private propService: PropertiesService, private deviceService: DeviceService) {

  }

  ngOnInit() {

    this.salesPersonId = this.session.getItem('salesPersonId');

    this.device = this.deviceService.getDevice();

    this.activityService.getClientSegments().subscribe(
      segs => {
        this.segmentsList = segs;
        this.segment = this.client.dataKey.segmentIndicator;
      }
    )

    this.setClientProfile();
   
  }


  segmentChange() {

    this.userService.updateSegment({ userId: this.client.dataKey.userId, segmentIndicator: this.segment , salesPersonId: this.salesPersonId}).subscribe(
      result => {
        console.log('segment update', result)
        this.segmentChanged = true;
      })
  }

  cancel() {
    if (this.segmentChanged) {
      this.dialogRef.close('update')
    }
    else {
      this.dialogRef.close('close')
    }

  }
  swipe(ev) {
    this.dialogRef.close('close')
  }

  getIcon(type) {
    return this.propService.getPropertyMarker(type);

  }

  setClientProfile() {
    console.log('act', this.client.dataKey)
    this.spinner.show("detailSpinner");
    this.clientProfielService.getClientProfile(this.client.dataKey.userId, this.salesPersonId).subscribe(
      val => {
        this.profile = val;

        if (this.profile.preferences.userId) {
          this.searchDefinition = 1

          if (this.profile.preferences.priceFrom > 50000) {
            this.searchDefinition = 2
            if (this.profile.preferences.priceTo - this.profile.preferences.priceFrom <= 1000000) {
              this.searchDefinition = 3
            }
          }
        }

        this.spinner.hide("detailSpinner");
      }
    );


  }
  sendSMS(phoneNumber) {
    if (this.deviceService.getDevice() == 'browser') {
      alert('This feature works on SMS enabled devices, only');
      return;
    }
    console.log('sms', phoneNumber)
    if (phoneNumber.length > 9) {
      sms.send(phoneNumber, '...', AppConfig.SMS_OPTIONS, s => { }, e => { });
    }

  }

  composeMessage(){
    let email = this.client.dataKey.email;
    let body = "Compose a great message for "+this.client.dataKey.name +" who is actively "
 

    if(this.client.dataKey.activity =='Sign Ups'){
      body = "...... Hello "+this.client.dataKey.name+". Thank you for SIGNING UP! ...... "
    }
    if(this.client.dataKey.activity =='Tracks + Sold'){
      body = "...... Hello "+this.client.dataKey.name+". I've noticed your favourite listings were SOLD, recently. If you'd like to discuss the details, I'm here to help. ......"
    }
    if(this.client.dataKey.activity =='Tracks'){
      body = "...... Hello "+this.client.dataKey.name+". I've noticed you are TRACKING some listings! ......"
    }
    if(this.client.dataKey.activity =='Views'){
      body = "...... Hello "+this.client.dataKey.name+".  ......"
    }

    return  "mailto:" + email +"?body="+body;

  }
 
}
