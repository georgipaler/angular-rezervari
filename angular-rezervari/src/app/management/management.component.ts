import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRoom } from '../all-rooms/room-interface/room';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from 'lodash';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  roomsArray: Array<IRoom> = [];
  public floorCateg: number[];
  public buildingCateg: string[];
  public selectedFloor = 3;
  public filtered1: IRoom[];
  public filtered2: IRoom[];
  public currentRoom: IRoom;
  public room: IRoom;
  public form: FormGroup;
  public formRoomOpen: boolean = false;
  public editOpen: boolean = false;
  public roomsListSubject: BehaviorSubject<any> = new BehaviorSubject([]);
  public roomsList: Observable<IRoom[]>;

  public denumire:any;
  public etaj: any;
  public cladire: any;

  constructor(public http: HttpClient,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [[Validators.required, Validators.minLength(3)]],
      floors: [Validators.required],
      building: [Validators.required]
    });
  }


  ngOnInit() {
    this.http.get("https://scenic-voyageurs-67377.herokuapp.com/room")
      .subscribe((data: IRoom[]) => {

        this.roomsListSubject.next(_.cloneDeep(data));
        this.filtered1 = _.cloneDeep(data);
        this.filtered2 = _.cloneDeep(data);
        this.roomsArray = _.cloneDeep(data);
        this.buildingCateg = Array.from(new Set(this.roomsArray.map(tip => { return tip.building; })));
        this.buildingCateg.sort((categ1, categ2) => {
          if (categ1 < categ2) return -1;
          if (categ1 > categ2) return 1;
          return 0;
        });

        this.floorCateg = Array.from(new Set(this.roomsArray.map(tip => { return tip.floor; })));
        this.floorCateg.sort((categ1, categ2) => {
          if (categ1 < categ2) return -1;
          if (categ1 > categ2) return 1;
          return 0;
        });
      });

      
    
  }

  public compare(building: string, searchBuilding: string): boolean {
    if (building.toLowerCase() === (searchBuilding.toLowerCase())) {
      return true;
    }
    return false;
  }

  showRoom(room: IRoom): void {
    this.room = room;
    console.log("room", this.room);
  }

  //delete room
  deleteRoom() {
    console.log("do delete", this.room._id);
    this.deleteLocalRoom(this.room);
    this.http.delete("https://scenic-voyageurs-67377.herokuapp.com/room/" + this.room._id).subscribe(res => console.log("delete", res));
  }
  deleteLocalRoom(element){
      const index = this.roomsArray.indexOf(element);
      if (index !== -1) {
          this.roomsArray.splice(index, 1);
      }
  }

  //edit room
  editRoom() {
    this.editOpen = true;
    console.log("edit room", this.room);
    console.log("do edit");
  }

  editThisRoom() {
  
    let room: IRoom = {
      name: "edit edit",
      floor: 3,
      building: 'Build3'
    }

    this.http.patch("https://scenic-voyageurs-67377.herokuapp.com/room/5b9a6cd0b56436001484ebc1", room)
    .subscribe(
      (val) => {
        console.log("PATCH call successful value returned in body",
          val);
      }, error=> console.log(error))
  }
  
  editNameKeyup(event: any) {
    this.denumire= event.target.value;
    console.log("denu", this.denumire);
    
  }
  editFloorKeyup(event: any) {
    this.etaj = event.target.value;
    console.log(this.etaj);
  }
  editBuildingKeyup(event: any) {
    this.cladire = event.target.value;
    console.log(this.cladire);
  }

 

  //add room
  addRoom() {
    this.formRoomOpen = true;
    console.log(this.formRoomOpen);
  }


  

  newRoom(camera: IRoom): IRoom {
    camera = this.form.value;
    this.addRooms(this.form.value);
    this.roomsArray = this.roomsArray.concat([this.form.value]);
    return camera;
  }

 

  addRoomDataObservable(): Observable<any> {

    let room: any = {
      name: this.denumire,
      floor: this.etaj,
      building: this.cladire
    }
    this.roomsArray = this.roomsArray.concat([room]);

    return this.http
      .post("https://scenic-voyageurs-67377.herokuapp.com/room", room);
  }

  addRooms(camera: any): void {
    this.currentRoom = camera;

    this.addRoomDataObservable().subscribe(data => {
      this.roomsArray.push(_.cloneDeep(camera));
      this.roomsListSubject.next(this.roomsArray);
    });
  }

  onNameKeyup(event: any) {
    this.denumire= event.target.value;
    console.log("denu", this.denumire);
    
  }
  onFloorKeyup(event: any) {
    this.etaj = event.target.value;
    console.log(this.etaj);
  }
  onBuildingKeyup(event: any) {
    this.cladire = event.target.value;
    console.log(this.cladire);
  }

  private cloneRooms() {
    return _.cloneDeep(this.roomsListSubject.getValue());
  }

  goBack(){
    this.formRoomOpen = false;
    this.editOpen = false;
  }

}

