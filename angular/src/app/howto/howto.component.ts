import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import { CoolLocalStorage } from '@angular-cool/storage';



@Component({
  selector: 'app-howto',
  templateUrl: './howto.component.html',
  styleUrls: ['./howto.component.css']
})
export class HowtoComponent implements OnInit {
  user: any;
  currentRute = 'undetermined'
  constructor(private session: CoolLocalStorage, private router: Router ) {
    this.user = session.getItem('user');

   }

  ngOnInit() {
    this.currentRute = this.router.url;
  }

}
