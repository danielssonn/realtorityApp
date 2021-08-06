import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-checking-details',
  templateUrl: './checking-details.component.html',
  styleUrls: ['./checking-details.component.css']
})
export class CheckingDetailsComponent implements OnInit {

  checkingStats: any
  constructor(@Inject(MAT_DIALOG_DATA) public stats: any) { 
    this.checkingStats = stats.dataKey;
    console.log(this.checkingStats);
  }

  ngOnInit(): void {
  }

}
