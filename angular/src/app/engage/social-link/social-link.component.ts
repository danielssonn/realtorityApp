import { Component, OnInit } from '@angular/core';
import { SocialLinksDataSource } from './social-link.datasource';
import { SocialLinkService } from './social-link.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-social-link',
  templateUrl: './social-link.component.html',
  styleUrls: ['./social-link.component.css']
})
export class SocialLinkComponent implements OnInit {
  dataSource: SocialLinksDataSource;

  networks: any[] = [
    {value: 'facebook', viewValue: 'Facebook Post'},
    {value: 'facebookads', viewValue: 'Facebook Ads'},
    {value: 'googleads', viewValue: 'Google Ads/AdWords'}
   
  ];

  connectSocialForm = new FormGroup({
    network: new FormControl(''),
    user: new FormControl(''),
    password: new FormControl(''),
    comment: new FormControl('')
  

  });

  displayedColumns = ['name', 'status', 'comment', 'remove'];

  constructor(private socialLinkService: SocialLinkService) {
    this.dataSource = new SocialLinksDataSource(this.socialLinkService);

   }

  ngOnInit() {
  }

  connect(){}

}
