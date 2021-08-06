import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'app/user.service';
import { ClientProfile } from './clientProfile';
import { ClientProfileService } from './client-profile.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.css']
})
export class ClientOverviewComponent implements OnInit {
  device: String;
  profile: ClientProfile;
  constructor(@Inject(MAT_DIALOG_DATA) public client: any, private userService: UserService,
    private dialogRef: MatDialogRef<ClientOverviewComponent>,
    private clientProfielService: ClientProfileService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.device = "mobi"
    console.log(' ... ', this.client)
    this.profile = { client: this.client, activity: this.client.checked, engagement: { level: '', color: '' }, preferences: { 
      
    }, visits: { next: {} } }
    this.setClientProfile();
  }

  cancel() {

    this.dialogRef.close('close')

  }
  swipe(ev) {
    this.dialogRef.close('close')
  }

  setClientProfile() {

    this.clientProfielService.getClientProfile(this.client.dataKey.userId).subscribe(
      val => { this.profile = val; }
    );


  }

}
