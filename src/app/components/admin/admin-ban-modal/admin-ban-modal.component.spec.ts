import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBanModalComponent } from './admin-ban-modal.component';

describe('AdminBanModalComponent', () => {
  let component: AdminBanModalComponent;
  let fixture: ComponentFixture<AdminBanModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBanModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminBanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
