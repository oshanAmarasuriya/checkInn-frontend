import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultPopupComponent } from './search-result-popup.component';
import { MatDialogModule,MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('SearchResultPopupComponent', () => {
  let component: SearchResultPopupComponent;
  let fixture: ComponentFixture<SearchResultPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultPopupComponent,MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue:  { dataArray: [] } },
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchResultPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
