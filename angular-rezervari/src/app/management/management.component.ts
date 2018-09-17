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
  public floorCateg: number[];
  public buildingCateg: string[];
  public selectedFloor = 3;
  public filtered1: IRoom[];
  public filtered2: IRoom[];
  public room: IRoom;
  constructor(public http: HttpClient) { }


  ngOnInit() {
    this.http.get("https://scenic-voyageurs-67377.herokuapp.com/room")
      .subscribe((data: IRoom[]) => {
        this.roomsArray = data;
        this.filtered1 = [...this.roomsArray];
        this.filtered2 =[...this.roomsArray];
        console.log("get user", this.roomsArray);

        this.buildingCateg = Array.from(new Set(this.roomsArray.map(tip => { return tip.building; })));
          this.buildingCateg.sort(function (categ1, categ2) {
          if (categ1 < categ2) return -1;
          if (categ1 > categ2) return 1;
          return 0;
        });

        this.floorCateg = Array.from(new Set(this.roomsArray.map(tip => { return tip.floor; })));
        this.floorCateg.sort(function (categ1, categ2) {
          if (categ1 < categ2) return -1;
          if (categ1 > categ2) return 1;
          return 0;
        });
        console.log("floorCateg", this.floorCateg);
      });


  }

  public compare(building: string, searchBuilding: string): boolean {
    if (building.toLowerCase() === (searchBuilding.toLowerCase())) {
      return true;
    }
    return false;
  }

  addRoom(){
    
  }

  
  showRoom(room: IRoom): void {
    this.room = room;
    console.log("room", this.room);
  }
}

