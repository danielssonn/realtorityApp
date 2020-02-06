import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManagerDetailsComponent } from './client-manager-details.component';

describe('ClientManagerDetailsComponent', () => {
  let component: ClientManagerDetailsComponent;
  let fixture: ComponentFixture<ClientManagerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientManagerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientManagerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
