import { Component, Input } from '@angular/core';
import { Marketing } from '../marketing';

@Component({
  selector: 'app-just-text-ad',
  templateUrl: './just-text-ad.component.html',
  styleUrls: ['./just-text-ad.component.css']
})
export class JustTextAdComponent implements Marketing {
  @Input() data: any;

}
