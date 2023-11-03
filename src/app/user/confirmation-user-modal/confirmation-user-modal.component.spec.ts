import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationUserModalComponent } from './confirmation-user-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationUserModalComponent;
  let fixture: ComponentFixture<ConfirmationUserModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationUserModalComponent]
    });
    fixture = TestBed.createComponent(ConfirmationUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
