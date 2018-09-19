import { Component, OnInit } from '@angular/core';
import { IRoom } from '../all-rooms/room-interface/room';
import { IReservation } from './reservation-interface/reservation-interface';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUser } from '../all-users/user-interface/user-interface';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  roomsArray: IRoom[];
  usersArray: IUser[];
  room: IRoom;
  booking: IReservation;
  public myForm: FormGroup;

    public username: string;
    public resName: string;
    public startDate: any;
    public endDate: any;
    public roomName: string;

  constructor(public http: HttpClient,
    private formBuilder: FormBuilder) {

    this.myForm = this.formBuilder.group({
      yourName: [
        '',
        Validators.required,
        Validators.minLength(4)
      ],
      name:[
        '',
        Validators.required,
        Validators.minLength(4)
      ],
      startDate:[
        '',
        Validators.required
      ],
      endDate: [
        '',
        Validators.required
      ],
      room: [
        '',
        Validators.required
      ]
    });
  }

  ngOnInit() {
    this.http.get("https://scenic-voyageurs-67377.herokuapp.com/room")
      .subscribe((data: IRoom[]) => {
        this.roomsArray = data;
        console.log("get room booking", this.roomsArray);
      });

      this.http.get("https://scenic-voyageurs-67377.herokuapp.com/appusers")
      .subscribe((data: IUser[]) => {
        this.usersArray = data;
        console.log("users",  this.usersArray);
      });
  }

  showReservation(): any {
    this.usersArray.forEach(user => {
      if(this.compare(user.username, this.username)){
        this.username = user._id;
      }
    });
    this.roomsArray.forEach(room => {
      if(this.compare(room.name, this.roomName)){
        this.roomName = room._id;
      }
    });
    let formInput: IReservation = {
      name: this.resName,
      roomId: this.roomName,
      userId: this.username,
      startDate: this.startDate,
      endDate: this.endDate,
      
    }
    console.log(formInput);
    return formInput;
  }


  onKeyupUsername(event: any){
    this.username = event.target.value;
    console.log( this.username);
  }

  onKeyupReservationName(event: any){
    this.resName = event.target.value;
    console.log( this.resName);
  }

  onKeyupStartDate(event: any){
    var date = new Date(event.target.value); 
    var milliseconds = date.getTime(); 
    this.startDate = milliseconds;
    console.log( this.startDate);
  }

  onKeyupEndDate(event: any){
    var date = new Date(event.target.value); 
    var milliseconds = date.getTime(); 
    this.endDate = milliseconds;
    console.log( this.endDate);
  }

  onKeyupRoomName(event: any){
    this.roomName = event.target.value;
    console.log( this.roomName);
  }

  //submit - add reservation
 
  addReservation(): Observable<any> {

    this.booking = this.showReservation();
    console.log("post");
    return this.http
      .post("https://scenic-voyageurs-67377.herokuapp.com/reservation", this.booking);
  }


  public compare(building: string, searchBuilding: string): boolean {
    if (building.toLowerCase() === (searchBuilding.toLowerCase())) {
      return true;
    }
    return false;
  }

}
