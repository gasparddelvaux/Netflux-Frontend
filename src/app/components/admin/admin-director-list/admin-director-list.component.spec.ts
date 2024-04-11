import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDirectorListComponent } from './admin-director-list.component';

describe('AdminDirectorListComponent', () => {
  let component: AdminDirectorListComponent;
  let fixture: ComponentFixture<AdminDirectorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDirectorListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDirectorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
