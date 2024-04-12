import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeederComponent } from './seeder.component';

describe('SeederComponent', () => {
  let component: SeederComponent;
  let fixture: ComponentFixture<SeederComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeederComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
