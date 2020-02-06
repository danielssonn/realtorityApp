import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManagerRecommendComponent } from './client-manager-recommend.component';

describe('ClientManagerRecommendComponent', () => {
  let component: ClientManagerRecommendComponent;
  let fixture: ComponentFixture<ClientManagerRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientManagerRecommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientManagerRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
