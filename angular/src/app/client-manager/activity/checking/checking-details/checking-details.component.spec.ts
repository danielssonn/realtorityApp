import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckingDetailsComponent } from './checking-details.component';

describe('CheckingDetailsComponent', () => {
  let component: CheckingDetailsComponent;
  let fixture: ComponentFixture<CheckingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
