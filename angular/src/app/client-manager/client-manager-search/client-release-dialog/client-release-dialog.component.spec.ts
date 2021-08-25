import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReleaseDialogComponent } from './client-release-dialog.component';

describe('ClientReleaseDialogComponent', () => {
  let component: ClientReleaseDialogComponent;
  let fixture: ComponentFixture<ClientReleaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientReleaseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientReleaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
