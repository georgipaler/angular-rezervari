import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRoom } from '../all-rooms/room-interface/room';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {

  @Input('data') dataToUse:IRoom;
  @Output('showRoom') showNRooms: EventEmitter<IRoom> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
    console.log("data", this.dataToUse)
  }

  showRoom(){
    let room = this.dataToUse;
    this.showNRooms.emit(room);                                                         
  }

}
