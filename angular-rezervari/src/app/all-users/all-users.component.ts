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
      console.log("reservation",  this.reservations);
    });
  }

}
