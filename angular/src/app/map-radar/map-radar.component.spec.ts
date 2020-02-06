import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRadarComponent } from './map-radar.component';

describe('MapRadarComponent', () => {
  let component: MapRadarComponent;
  let fixture: ComponentFixture<MapRadarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapRadarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
