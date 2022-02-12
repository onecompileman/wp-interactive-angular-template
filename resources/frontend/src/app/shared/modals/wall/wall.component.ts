import {
    AfterViewInit,
    Component,
    HostListener,
    OnDestroy,
    OnInit
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { SoundManagerService } from 'src/app/core/services/sound-manager.service';
import { TidioService } from 'src/app/core/services/tidio.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';
import { WallType } from '../../enums/wall-type.enum';
import { Wall } from '../../models/wall.model';

@Component({
    selector: 'app-wall',
    templateUrl: './wall.component.html',
    styleUrls: ['./wall.component.scss'],
})
export class WallComponent implements OnInit, AfterViewInit, OnDestroy {

    isPortrait: boolean;
    isMobile: boolean;
    isGallery: boolean;
    walls: any;
    iframeUrl: string;
    destroyed$ = new Subject();

    // initialState
    wallData: Wall;
    closeCallback: Function;

    constructor(
        public bsModalRef: BsModalRef,
        private tidioService: TidioService,
        private soundManagerService: SoundManagerService,
        private wsService: WebsocketService
    ) {}

    @HostListener('window:resize')
    onWindowResize(): void {
        this.isPortrait = innerHeight > innerWidth;
        this.isMobile = innerWidth < 900;
    }

    ngOnInit(): void {
        this.walls = WallType;
        this.tidioService.hideTidio();
        this.soundManagerService.stopBackgroundMusic();
        this.isPortrait = innerHeight > innerWidth;
        this.isMobile = innerWidth < 900;
        this.wsService.changeLocation(this.wallData.wallType);
    }

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {
        if (!this.wallData.openedFromAModal) {
            this.tidioService.showTidio();
            this.soundManagerService.playBackgroundMusic();
        }

        if (this.closeCallback) {
            this.closeCallback();
        }

        this.destroyed$.next();
        this.destroyed$.complete();
    }

    close(): void {
        this.bsModalRef.hide();

        if (this.closeCallback) {
            this.closeCallback();
        }
    }
}
