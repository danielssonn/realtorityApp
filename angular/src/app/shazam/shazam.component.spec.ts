import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShazamComponent } from './shazam.component';

describe('ShazamComponent', () => {
  let component: ShazamComponent;
  let fixture: ComponentFixture<ShazamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShazamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShazamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
