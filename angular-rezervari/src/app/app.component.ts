import { Component } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { BookingComponent } from './booking/booking.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ManagementComponent } from './management/management.component';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Booking room';
}
