import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRoom } from '../all-rooms/room-interface/room';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  roomsArray: IRoom[];
  constructor(public http: HttpClient) { }

  ngOnInit() {
       this.http.get("https://scenic-voyageurs-67377.herokuapp.com/room")
        .subscribe((data: IRoom[]) => {
          this.roomsArray = data; 
          console.log("get management room", this.roomsArray);
        });

  }

}
