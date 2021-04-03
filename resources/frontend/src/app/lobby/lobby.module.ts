import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LobbyRoutingModule } from './lobby-routing.module';
import { BoothComponent } from './booth/booth.component';
import { LobbyComponent } from './lobby.component';
import { LivestreamComponent } from './livestream/livestream.component';
import { LandingLobbyComponent } from './landing-lobby/landing-lobby.component';

@NgModule({
  declarations: [
    BoothComponent, 
    LobbyComponent, 
    LivestreamComponent, LandingLobbyComponent
  ],
  imports: [
    CommonModule,
    LobbyRoutingModule
  ]
})
export class LobbyModule { }
