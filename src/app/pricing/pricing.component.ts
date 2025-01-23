
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule ,Validators,FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequestManager } from '../services/request-manager';
import { DisplaySearchResultsService } from '../services/display-search-results.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent implements OnInit {
  searchForm!: FormGroup; //to store form inputs
  markUp: any; //to store current markup

  adultsList: number[] = [];
  roomsList: number[] = [];
  adultsAndRooms: number[]=[];
  adultsAndRoomsForPriceBased: number[]=[];
  toggleState: boolean = false;


  constructor(private fb: FormBuilder, private reqManager: RequestManager, private displaySearchResultsService: DisplaySearchResultsService) { }

  ngOnInit() {
    // Initialize
    this.searchForm = this.fb.group({
      checkInDate: [''],
      numOfNights: [1],
     sets: this.fb.array([this.createSet()]),
    });

    this.searchForm.valueChanges.subscribe(() => {
      this.updateLists();
    });

    this.markUp=5.6
    
    //data lists
  this.adultsList  = [];
  this.roomsList = [];
  this.adultsAndRooms=[];

  }
  updateLists() {
    //get data fom form input sets to lists
    this.adultsList = this.sets.value.map((set: any) => set.adults);
    this.roomsList = this.sets.value.map((set: any) => set.rooms);
  }

  createSet() {
    //new input set for a new pair of adults and rooms
    return this.fb.group({
      adults: [null, Validators.required],
      rooms: [null, Validators.required],
    });
  }

  addSet() {
    //Executed on add button click
    this.sets.push(this.createSet());
  }

  removeSet(index: number) {
    //Executed on remove button
    this.sets.removeAt(index);
  }

  get sets() {
    return this.searchForm.get('sets') as FormArray;
  }

  onSubmit() {
    //search button click
    this.adultsList  = [];
    this.roomsList = [];
    this.adultsAndRooms=[];
    this.adultsAndRoomsForPriceBased=[];
    this.updateLists();
    //creating final list for roomsAndAdultSets
   for (let i = 0; i < this.roomsList.length; i++) {
      for(let j=0; j<this.roomsList[i];j++){
        this.adultsAndRooms.push(this.adultsList[i]);
      }
   }
   
   this.search();

  }

  onClear(): void {
    //resetting the fields
    this.searchForm = this.fb.group({
      checkInDate: [''],
      numOfNights: [1],
      sets: this.fb.array([this.createSet()]),
    });
    this.adultsList  = [];
  this.roomsList = [];
  this.adultsAndRooms=[];
  this.adultsAndRoomsForPriceBased=[];
  }
  showAlert(message: string): void {
    //this.alertService.openAlert('Warning !', message);
    alert(message)
  }
  search() {
    /* validates the inputs and calls the search API */

    const searchData={
      "roomsAndAdultSets":this.adultsAndRooms,
      "checkInDate":this.searchForm.value.checkInDate,
      "numOfNights":this.searchForm.value.numOfNights
    }
    

    if (this.validateAdultsAndRooms()||searchData.roomsAndAdultSets.length==0 || searchData.numOfNights <= 0 || searchData.checkInDate == "") {
      this.showAlert('Invalid Input !');
    } else {
      //Toggle  button
    if (!this.toggleState) {
      //If unchecked call room type based search api
      //ready to call API
      this.reqManager.sendSearchData(searchData).subscribe(
        response => {
          console.log('Searching successful!');
          this.displaySearchResultsService.openAlert(response);
        },
        error => {
          this.showAlert('Error during searching!');
        }
      );
      //alert('perform search')
    }else{
      //If checked, call low price based search api
      this.priceBasedSearch();
    }
  }

  }
  validateAdultsAndRooms(): boolean{
    // validate  inputs taken from input fields
    for (let i = 0; i < this.adultsAndRooms.length; i++) {
        if(this.adultsAndRooms[i]<=0){
          return true;
        }
  }
return false;
}

priceBasedSearch(){
  // Getting ready user data to send price based searching API
  this.adultsList  = [];
    this.roomsList = [];
    this.adultsAndRoomsForPriceBased=[];
    this.updateLists();// preventing repeated inputs
  for(let i=0;i<this.adultsList.length;i++){
    this.adultsAndRoomsForPriceBased.push(this.adultsList[i]);
    this.adultsAndRoomsForPriceBased.push(this.roomsList[i]);
    // adultsAndRoomsForPriceBased ==> [#ofadults,#ofrooms,..,..]
  }
  const searchData={
    "roomsAndAdultSets":this.adultsAndRoomsForPriceBased,
    "checkInDate":this.searchForm.value.checkInDate,
    "numOfNights":this.searchForm.value.numOfNights
  }
  //calling the API
  this.reqManager.sendSearchDataPriceBased(searchData).subscribe(
    response => {
      console.log('Searching successful!');
      this.displaySearchResultsService.openAlert(response);
    },
    error => {
      alert('something went wrong');
    }
  );
  //alert('searching price based')
  console.log(this.adultsAndRoomsForPriceBased);
}

}

