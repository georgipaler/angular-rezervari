import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRoom } from './room-interface/room';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.css']
})
export class AllRoomsComponent implements OnInit {

  roomsArray : IRoom[];


  constructor( public http: HttpClient) { }

  
  ngOnInit() {
    this.http.get("https://scenic-voyageurs-67377.herokuapp.com/room").subscribe((data: IRoom[]) => {
      console.log("get user", data);
      this.roomsArray = data; 
    });


  }

}
