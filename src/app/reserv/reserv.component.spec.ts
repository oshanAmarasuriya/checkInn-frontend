import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservComponent } from './reserv.component';

describe('ReservComponent', () => {
  let component: ReservComponent;
  let fixture: ComponentFixture<ReservComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
