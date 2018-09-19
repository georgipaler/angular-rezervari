import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './user-interface/user-interface';
import { IReservation } from '../booking/reservation-interface/reservation-interface';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  public usersArray: IUser[];
  public reservations: IReservation[];
  public reservation: IReservation;
  public startDate: any;
  public endDate: any;

  startDateArray: any;
  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.http.get("https://scenic-voyageurs-67377.herokuapp.com/appusers")
    .subscribe((data: IUser[]) => {
      this.usersArray = data;
      console.log("users",  this.usersArray);
    });

    this.http.get("https://scenic-voyageurs-67377.herokuapp.com/reservation")
    .subscribe((data: IReservation[]) => {
      this.reservations = data;
      console.log("reservations",  this.reservations);

     
      for(let i=0; i< this.reservations.length; i++){
        this.reservations[i].startDate =new Date (this.reservations[i].startDate) ;
        this.reservations[i].endDate =new Date (this.reservations[i].startDate) ;
      }
      console.log(this.reservations);
    });

  }

}
