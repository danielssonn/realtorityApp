import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tracking-details',
  templateUrl: './tracking-details.component.html',
  styleUrls: ['./tracking-details.component.css']
})
export class TrackingDetailsComponent implements OnInit {

  trackingStats: any
  constructor(@Inject(MAT_DIALOG_DATA) public stats: any) { 
    this.trackingStats = stats.dataKey;
    console.log(this.trackingStats);
  }

  ngOnInit(): void {
  }

}
