import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchResultPopupComponent } from '../search-result-popup/search-result-popup.component';
import { Subject } from 'rxjs';

//Responsible for displaying the pop up panel for hotel room sarch and contract search results

@Injectable({
  providedIn: 'root'
})
export class DisplaySearchResultsService {
  private buttonClickSource = new Subject<void>();

  constructor(private dialog: MatDialog) { }
  openAlert(dataArray: any[]): void {
    this.dialog.open(SearchResultPopupComponent, {
      width:'600px',
      data: { dataArray },
    });
  }

  buttonClick$ = this.buttonClickSource.asObservable();
  triggerButtonClick() {
    this.buttonClickSource.next();
  }

}
