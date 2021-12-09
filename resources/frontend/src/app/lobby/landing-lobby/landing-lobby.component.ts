import { Component, HostListener, OnInit } from '@angular/core';
import { MarzipanoService } from 'src/app/core/services/marzipano.service';
import { SoundManagerService } from 'src/app/core/services/sound-manager.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';
import { WebsocketChannels, WebsocketLocations } from 'src/app/shared/enums/websocket-channels.enum';
import { AnimationOptions } from 'ngx-lottie';
import { MarzipanoSettings } from 'src/app/shared/models/marzipano-settings.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { TidioService } from 'src/app/core/services/tidio.service';

@Component({
  selector: 'pfizer-landing-lobby',
  templateUrl: './landing-lobby.component.html',
  styleUrls: ['./landing-lobby.component.scss']
})
export class LandingLobbyComponent implements OnInit {

  scene: any;
  options: AnimationOptions = {
    path: '/assets/data/360.json',
  };

  constructor(
    private soundManagerService: SoundManagerService,
    private wsService: WebsocketService,
    private marzipanoService: MarzipanoService,
    private loadingService: LoadingService,
    private tidioService: TidioService
  ) { }

  ngOnInit(): void {
    this.onWindowResize();
    this.soundManagerService.playBackgroundMusic();

    this.wsService.changeLocation(
      WebsocketLocations.LOBBY,
      WebsocketChannels.LOBBY
    );
  }

  ngAfterViewInit(): void {
    this.initLobby();
    setTimeout(() => {
      this.loadingService.loading$.next(false);
      this.tidioService.showTidio();
    }, 1800);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    document.documentElement.style.height = `${window.innerHeight}px`;
    if (this.scene) {
      this.marzipanoService.updateHotspotLocations(this.scene);
    }
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 500);
  }

  dispatchEvent(item: string): void {}

  private initLobby(): void {
    const marzipanoSettings: MarzipanoSettings = {
      containerId: 'lobbyPano',
      bgImage: 'assets/images/backgrounds/lobby.jpg',
      yaw: 0,
      pitch: 0.1
    };
    this.scene = this.marzipanoService.initMarzipano(marzipanoSettings);
  }
}
