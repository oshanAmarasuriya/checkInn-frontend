import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';

class MockAuthenticationService{
  logOut(){

  }
}
class MockActivatedRoute {
 
}


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authenticationService:AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers :[
        {provide: AuthenticationService, useClass: MockAuthenticationService},
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
   // authenticationService= TestBed.inject(AuthenticationService) as MockAuthenticationService;
    fixture.detectChanges();
  });

  it('should create', () => {
    //spyOn(authenticationService,'logout');
    expect(component).toBeTruthy();
  });
});
