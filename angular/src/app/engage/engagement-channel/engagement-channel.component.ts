import { Component, OnInit, ViewChild } from '@angular/core';
import { SocialLinksDataSource } from './engagement-channel.datasource';
import { SocialLinkService } from './engagement-channel.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-social-link',
  templateUrl: './engagement-chanel.component.html',
  styleUrls: ['./engagement-channel.component.css']
})

export class SocialLinkComponent implements OnInit {
  
  dataSource: SocialLinksDataSource;

  @ViewChild(MatPaginator, { static: false }) channelsPaginator: MatPaginator;

  displayedColumns = ['name', 'accessId', 'accessPassword', 'comment'];


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


  constructor(private socialLinkService: SocialLinkService) {
    this.dataSource = new SocialLinksDataSource(this.socialLinkService);

   }

  ngOnInit() {
    this.dataSource.loadChannels("", "");
  }

  connect(){}

}
