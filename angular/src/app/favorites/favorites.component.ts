import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { PropertiesService } from '../properties.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { error } from '../../../../node_modules/@angular/compiler/src/util';
import { UserService } from 'app/user.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { MessageService } from 'app/message.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, AfterViewInit {

  favorites: any;
  filteredFavorites: any;
  filterControl = new FormControl();
  favFilter: String;
  private subscription: Subscription;




  @ViewChild(CdkVirtualScrollViewport, { static: false }) viewport: CdkVirtualScrollViewport;

  constructor(private router: Router, private service: PropertiesService, private spinner: NgxSpinnerService,
    private userService: UserService, private messageService: MessageService) {
      console.log('favourites component constructed');
    this.refresh();

    this.subscription = this.messageService.getMessage().subscribe(message => {

      if (message.text === 'updateFavs') {
        console.log('updateFavs received')
        this.refresh();
      }

    });

  }

  refresh() {

    this.filteredFavorites = [];
    this.spinner.show();
    this.service.getUserPreferences().subscribe(
      val => {

        this.service.clearCachedProperties();
        this.service.favorites().then(
          value => {

            this.favorites = value;
            this.filteredFavorites = this.filterControl.valueChanges
              .pipe(
                startWith(''),
                map(value => this._filterFavorites(value))
              );

            this.spinner.hide();


          }, err => { this.spinner.hide(); this.router.navigate(['ohoh']) });
      }
    );

  }

  showDetail = function () {
    this.router.navigate(['details']);
  };
  ngOnInit() {

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  private _filterFavorites(value: string): string[] {
    console.log('filtering')
    const filterValue = value.toLowerCase();
    return this.favorites.filter(option => {
        if(option.addr =="170 Jozo Weider Blvd"){
          console.log('Jozo!')
        }
       return option.addr.toLowerCase().includes(filterValue)
      });
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.viewport.scrollToIndex(this.service.getScrollPosition());
    });


  }

  scrolledTo(ev) {
    if (ev != 0) {
      this.service.setScrollPosition(ev);

    }
  }

}
