import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldDetailsComponent } from './sold-details.component';

describe('SoldDetailsComponent', () => {
  let component: SoldDetailsComponent;
  let fixture: ComponentFixture<SoldDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
