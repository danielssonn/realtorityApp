import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordLegendComponent } from './keyword-legend.component';

describe('KeywordLegendComponent', () => {
  let component: KeywordLegendComponent;
  let fixture: ComponentFixture<KeywordLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeywordLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
