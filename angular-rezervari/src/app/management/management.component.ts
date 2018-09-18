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

  roomsArray: Array<IRoom> =[];
  public floorCateg: number[] ;
  public buildingCateg: string[];
  public selectedFloor = 3;
  public filtered1: IRoom[];
  public filtered2: IRoom[];
  public currentRoom: IRoom;
  public room: IRoom;
  public form 	: FormGroup;
  public formRoomOpen: boolean =false;

  public roomsListSubject:BehaviorSubject<any> = new BehaviorSubject([]) ;
  public roomsList: Observable<IRoom[]>;

  constructor(public http: HttpClient,
        private formBuilder : FormBuilder) { 
          this.form = this.formBuilder.group({
            name: [ [Validators.required, Validators.minLength(3)]],
            floors: [  Validators.required],
            building: [  Validators.required]
          });
        }


  ngOnInit() {
    this.http.get("https://scenic-voyageurs-67377.herokuapp.com/room")
      .subscribe((data: IRoom[]) => {
        
        this.roomsListSubject.next(_.cloneDeep(data));
        this.filtered1= _.cloneDeep(data);
        this.filtered2= _.cloneDeep(data);
        this.roomsArray= _.cloneDeep(data);
        console.log("rooms array", this.roomsArray);
        this.buildingCateg = Array.from(new Set(this.roomsArray.map(tip => { return tip.building; })));
        this.buildingCateg.sort((categ1, categ2)=>{
            if(categ1 < categ2) return -1;
            if(categ1 > categ2) return 1;
            return 0;
          });

          this.floorCateg = Array.from(new Set(this.roomsArray.map(tip => { return tip.floor; })));
          this.floorCateg.sort((categ1, categ2)=>{
              if(categ1 < categ2) return -1;
              if(categ1 > categ2) return 1;
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
    this.formRoomOpen = true;
    console.log(this.formRoomOpen);
  }
  showRoom(room: IRoom): void {
    this.room = room;
    console.log("room", this.room);
  }

  newRoom(camera: IRoom): IRoom{
    camera = this.form.value;
    this.addRooms(this.form.value);
    this.roomsArray = this.roomsArray.concat([this.form.value]);
    return camera;
  }
  onSubmit(){
    console.log("######");
    this.addRooms(this.form.value);
    this.roomsArray = this.roomsArray.concat([this.form.value]);
  }
  

  addRoomDataObservable(room: IRoom): Observable<any> {
    return this.http
    .post("https://scenic-voyageurs-67377.herokuapp.com/room", room);
  }

  addRooms(camera: any):void {
    this.currentRoom = this.newRoom(camera);
   
    this.addRoomDataObservable(this.currentRoom).subscribe(data => {
      this.roomsArray.push(_.cloneDeep(camera));
      this.roomsListSubject.next(this.roomsArray);

    });
  } 

  private cloneRooms(){
    return _.cloneDeep(this.roomsListSubject.getValue());
  }

}

