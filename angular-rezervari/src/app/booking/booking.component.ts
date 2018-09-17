import { Component, OnInit } from '@angular/core';
import { IRoom } from '../all-rooms/room-interface/room';
import { IReservation } from './reservation-interface/reservation-interface';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
    roomsArray : IRoom[];
    room: IRoom;
    booking: IReservation;
    public  myForm: FormGroup;

  constructor(public http: HttpClient,
            private formBuilder : FormBuilder) {
              
    this.myForm = this.formBuilder.group({
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      'startDate': new FormControl('', [
        Validators.required
      ]),
      'endDate': new FormControl('', [
        Validators.required
      ]),
    });
             }

  ngOnInit() {
     this.http.get("https://scenic-voyageurs-67377.herokuapp.com/room")
    .subscribe((data: IRoom[]) => {
      this.roomsArray = data; 
      console.log("get user booking", this.roomsArray);
    }); 
  }



}
