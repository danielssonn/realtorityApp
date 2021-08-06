import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-engaging-details',
  templateUrl: './engaging-details.component.html',
  styleUrls: ['./engaging-details.component.css']
})
export class EngagingDetailsComponent implements OnInit {

  engagingStats: any
  constructor(@Inject(MAT_DIALOG_DATA) public stats: any) { 
    this.engagingStats = stats.dataKey;
    console.log('!11',this.engagingStats)
   
  }


  ngOnInit(): void {
  }

}
