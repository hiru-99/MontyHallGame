import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MontyHallComponent } from './monty-hall/monty-hall.component';
import { DoorComponent } from './door/door.component';
import { ResultComponent } from './result/result.component';
import { HistoryComponent } from './history/history.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    MontyHallComponent,
    DoorComponent,
    ResultComponent,
    HistoryComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
