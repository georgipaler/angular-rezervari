import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';

@NgModule({
  declarations: [
    AppComponent,
    AllRoomsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
