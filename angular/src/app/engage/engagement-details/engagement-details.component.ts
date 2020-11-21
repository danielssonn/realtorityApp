import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-engagement-details',
  templateUrl: './engagement-details.component.html',
  styleUrls: ['./engagement-details.component.css']
})
export class EngagementDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public engagement: any,private dialogRef: MatDialogRef<EngagementDetailsComponent>,
  private sanitize: DomSanitizer
  ) { }

  ngOnInit() {

    console.log(this.engagement)
  }


  getHTMLValue(val) {
    return this.sanitize.bypassSecurityTrustHtml(val);
  }

}
