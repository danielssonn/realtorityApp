import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdWithMapComponent } from './ad-with-map.component';

describe('AdWithMapComponent', () => {
  let component: AdWithMapComponent;
  let fixture: ComponentFixture<AdWithMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdWithMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdWithMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
