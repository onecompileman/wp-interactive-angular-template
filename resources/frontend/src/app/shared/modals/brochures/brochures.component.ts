import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/core/services/modal.service';
import { SoundManagerService } from 'src/app/core/services/sound-manager.service';
import { TidioService } from 'src/app/core/services/tidio.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';
import { BaseComponent } from 'src/app/core/utils/base.component';
import { ActionType } from '../../enums/action-type.enum';
import { Asset } from '../../models/asset.model';
import { Brochure } from '../../models/brochure.model';
import { VideoPreview } from '../../models/video-preview.model';
import { PreviewVideoComponent } from '../preview-video/preview-video.component';

@Component({
  selector: 'app-brochures',
  templateUrl: './brochures.component.html',
  styleUrls: ['./brochures.component.scss']
})
export class BrochuresComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('parentContainer') parentContainer: ElementRef;
  @ViewChild('base') base: ElementRef;

  actionType = ActionType;
  openedPreview: boolean;
  completedVideos: boolean;

  // initial state
	data: Brochure;
	closeCallback: Function;

  constructor(
    private bsModalRef: BsModalRef,
    private tidioService: TidioService,
    private soundManagerService: SoundManagerService,
    private modals: ModalService,
    private bsModalService: BsModalService,
    private wsService: WebsocketService
  ) {
    super();
  }

  ngOnInit(): void {
    super.parentContainer = this.parentContainer;
    super.base = this.base;

    this.wsService.changeLocation('Video Gallery');
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      super.rescale(700, 500);
    }, 100);

    this.tidioService.hideTidio();
    this.soundManagerService.stopBackgroundMusic();
  }

  ngOnDestroy(): void {
    if (this.openedPreview) {
      return;
    }

    this.tidioService.showTidio();
    this.soundManagerService.playBackgroundMusic();
  }

  close(): void {
    this.bsModalRef.hide();

    if (this.closeCallback) {
      setTimeout(() => {
        this.closeCallback();
      }, 800);
    }
  }

  previewVideo(data: Asset): void {
    this.bsModalRef.hide();
    this.openedPreview = true;

    const videoData:VideoPreview = {
      id: data.id,
      title: data.title,
      video_url: data.video_url,
      isSingleModal: false
    };

    setTimeout(() => {
      this.modals.refs.push(
        this.bsModalService.show(PreviewVideoComponent, {
                    class: 'modal-dialog-centered alaska-modal alaska-modal--lg alaska-modal--w-bg alaska-modal--auto-resize',
                    keyboard: false,
                    ignoreBackdropClick: true,
                    initialState: {
                        data: videoData,
                        brochureData: this.data,
                        closeCallback: () => {}
                    }
                })
            );
    }, 200);
  }
}
