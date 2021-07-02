import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'app/message.service';
import { PropertiesService } from 'app/properties.service';
import { UserService } from 'app/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { KeywordLegendComponent } from './keyword-legend/keyword-legend.component';


@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.css']
})
export class KeywordsComponent implements OnInit {
  hasChanged: boolean;
  keyword1:any;
  keyword2:any;
  keyword3:any;
  keyword4:any;


  constructor(private router: Router, private service: PropertiesService, private spinner: NgxSpinnerService,
    private dialog: MatDialog) {


      service.getUserPreferences().subscribe(val => {
        if (val.keyword1){
          this.keyword1 = val.keyword1;
        }
        if (val.keyword2){
          this.keyword2 = val.keyword2;
        }
        if (val.keyword3){
          this.keyword3 = val.keyword3;
        }
        if (val.keyword4){
          this.keyword4 = val.keyword4;
        }

      })


     }

  ngOnInit(): void {
  }

  changed() {
    this.hasChanged = true;
  }
  
  next() {

    // this.service.savePriceRange({ priceFrom: this.getFrom(), priceTo: this.getTo() }).then(() => {
    // tslint:disable-next-line:max-line-length
    if (this.hasChanged) {

      this.save();
      this.router.navigate(['./week'])

    } else {
      this.router.navigate(['./week'])
    }
  }  

  previous() {
    if (this.hasChanged) {
      this.save();
      this.router.navigate(['./interview/price'])

    } else { this.router.navigate(['./interview/price']) }
  }
  
  save() {
    if (this.hasChanged) {
      this.spinner.show();
      this.service.saveKeywords(this.keyword1, this.keyword2, this.keyword3, this.keyword4).then(() => {
        this.service.dailyReset();
        this.service.weeklyReset();
        this.spinner.hide();

      })
    }
  } 
  showKeywordLegend(){
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(KeywordLegendComponent, {
      height: '90vh',
      width: '80vw',
      minWidth: '375px'
    });

  }
}
