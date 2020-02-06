import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-oh-oh',
  templateUrl: './oh-oh.component.html',
  styleUrls: ['./oh-oh.component.css']
})
export class OhOhComponent implements OnInit {
  @Input() error: string;
  constructor(private route: ActivatedRoute, private router: Router) { }



  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.error = params['error'];
    });
  }

  retry(){
    this.router.navigate(['/']);
  }

}
