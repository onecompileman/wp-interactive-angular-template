import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SoundManagerService } from 'src/app/core/services/sound-manager.service';
import { TidioService } from 'src/app/core/services/tidio.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';
import { BaseComponent } from 'src/app/core/utils/base.component';
import { VideoPreview } from '../../models/video-preview.model';
import Player from '@vimeo/player';

@Component({
    selector: 'app-preview-video',
    templateUrl: './preview-video.component.html',
    styleUrls: ['./preview-video.component.scss'],
})
export class PreviewVideoComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('previewIframe') previewIframe: ElementRef;
    @ViewChild('parentContainer') parentContainer: ElementRef;
    @ViewChild('base') base: ElementRef;

    videoUrl: string;

    // initialState
    closeCallback: Function;
    parentCloseCallback: any;
    data: VideoPreview;

    constructor(
        private bsModalRef: BsModalRef,
        private soundManagerService: SoundManagerService,
        private tidioService: TidioService,
        private wsService: WebsocketService
    ) {
        super();
    }

    ngOnInit(): void {
        super.parentContainer = this.parentContainer;
        super.base = this.base;

        this.videoUrl = this.data.video_url + '?autoplay=1';
        this.soundManagerService.stopBackgroundMusic();
        this.tidioService.hideTidio();
        this.wsService.changeLocation(this.data.title);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            super.rescale(700, 500);
        }, 100);

        const player = new Player(this.previewIframe.nativeElement);
        player.on('ended', () => this.close());
    }

    ngOnDestroy(): void {
        if (this.data.isSingleModal) {
            this.tidioService.showTidio();
            this.soundManagerService.playBackgroundMusic();
            return;
        }

        this.tidioService.hideTidio();
        this.soundManagerService.stopBackgroundMusic();
    }

    close(): void {
        this.bsModalRef.hide();

        if (this.closeCallback) {
            this.closeCallback();
        }
    }
}
