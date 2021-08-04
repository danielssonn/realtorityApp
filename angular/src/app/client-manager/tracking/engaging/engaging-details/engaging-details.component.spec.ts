import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagingDetailsComponent } from './engaging-details.component';

describe('EngagingDetailsComponent', () => {
  let component: EngagingDetailsComponent;
  let fixture: ComponentFixture<EngagingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
