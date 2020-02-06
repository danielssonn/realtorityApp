import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ad-host]',
})
export class MarketingDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}