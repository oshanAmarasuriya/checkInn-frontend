import { Component,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DisplaySearchResultsService } from '../services/display-search-results.service';

@Component({
  selector: 'app-search-result-popup',
  standalone: true,
  imports: [MatDialogModule,CommonModule],
  templateUrl: './search-result-popup.component.html',
  styleUrl: './search-result-popup.component.css'
})
export class SearchResultPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { dataArray: any[] },private dispSearchRes: DisplaySearchResultsService) {
  }

  onClick(){
    this.dispSearchRes.triggerButtonClick();
  }
  
}
