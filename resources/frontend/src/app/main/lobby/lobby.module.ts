import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LobbyRoutingModule } from './lobby-routing.module';
import { PlenaryStreamComponent } from './plenary-stream/plenary-stream.component';
import { BreakoutStreamComponent } from './breakout-stream/breakout-stream.component';
import { SymposiaStreamComponent } from './symposia-stream/symposia-stream.component';
import { BoothComponent } from './booth/booth.component';
import { LobbyComponent } from './lobby.component';

@NgModule({
  declarations: [PlenaryStreamComponent, BreakoutStreamComponent, SymposiaStreamComponent, BoothComponent, LobbyComponent],
  imports: [
    CommonModule,
    LobbyRoutingModule
  ]
})
export class LobbyModule { }
