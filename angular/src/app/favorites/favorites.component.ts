import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { PropertiesService } from '../properties.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { error } from '../../../../node_modules/@angular/compiler/src/util';
import { UserService } from 'app/user.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, AfterViewInit {

  favorites: any;


  @ViewChild(CdkVirtualScrollViewport,  {static:false}) viewport: CdkVirtualScrollViewport;

  constructor(private router: Router, private service: PropertiesService, private spinner: NgxSpinnerService,
    private userService: UserService ) {
   
    this.service.getUserPreferences().subscribe(
      val => {
        this.spinner.show();
        this.service.favorites().then(
          value => {
    
            this.favorites = value;
            this.spinner.hide();
           
           
          }, err => {this.spinner.hide(); this.router.navigate(['ohoh']) });
      }
    );

    
   }

  showDetail = function() {
    this.router.navigate(['details']);
  };
  ngOnInit() {
  
  }

  ngAfterViewInit(){

    setTimeout(() => {
      this.viewport.scrollToIndex(this.service.getScrollPosition());
  });
  
   
  }
 
  scrolledTo(ev){
    if(ev!=0){
      this.service.setScrollPosition(ev);

    }
  }

}
