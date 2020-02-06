import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPreferenceOverviewComponent } from './search-preference-overview.component';

describe('SearchPreferenceOverviewComponent', () => {
  let component: SearchPreferenceOverviewComponent;
  let fixture: ComponentFixture<SearchPreferenceOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPreferenceOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPreferenceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
