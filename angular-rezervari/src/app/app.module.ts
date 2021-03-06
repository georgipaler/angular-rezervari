import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { BookingComponent } from './booking/booking.component';
import { ManagementComponent } from './management/management.component';

import { Routes, RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormBuilder, FormsModule } from '@angular/forms';
import { RoomCardComponent } from './room-card/room-card.component';
const routes: Routes =[
  { path: '', redirectTo: 'rooms', pathMatch: 'full'},
  { path: 'rooms', component: AllRoomsComponent},
  { path: 'booking', component: BookingComponent},
  { path: 'users', component: AllUsersComponent},
  { path: 'admin', component: ManagementComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AllRoomsComponent,
    AllUsersComponent,
    BookingComponent,
    ManagementComponent,
    RoomCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: true} )
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
