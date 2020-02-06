import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BedroomsComponent } from './bedrooms.component';

describe('BedroomsComponent', () => {
  let component: BedroomsComponent;
  let fixture: ComponentFixture<BedroomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BedroomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BedroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
