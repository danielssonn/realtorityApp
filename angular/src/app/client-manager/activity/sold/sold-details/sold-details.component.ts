import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sold-details',
  templateUrl: './sold-details.component.html',
  styleUrls: ['./sold-details.component.css']
})
export class SoldDetailsComponent implements OnInit {

  trackingSoldStats: any
  constructor(@Inject(MAT_DIALOG_DATA) public stats: any) { 
    this.trackingSoldStats = stats.dataKey;
    console.log(this.trackingSoldStats);
  }

  ngOnInit(): void {
  }

}
