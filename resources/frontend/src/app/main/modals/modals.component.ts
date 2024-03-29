import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/core/services/modal.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { ActionType } from 'src/app/shared/enums/action-type.enum';
import { AssetType } from 'src/app/shared/enums/asset-type.enum';
import { WallType } from 'src/app/shared/enums/wall-type.enum';
import { BrochuresComponent, PreviewVideoComponent, WallComponent } from 'src/app/shared/modals';
import { PhotoboothComponent } from 'src/app/shared/modals/photobooth/photobooth.component';
import { PreviewPdfComponent } from 'src/app/shared/modals/preview-pdf/preview-pdf.component';
import { Brochure } from 'src/app/shared/models/brochure.model';
import { PdfPreview } from 'src/app/shared/models/pdf-preview.model';
import { VideoPreview } from 'src/app/shared/models/video-preview.model';
import { Wall } from 'src/app/shared/models/wall.model';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {

  constructor(
    private bsModalService: BsModalService,
    private settingsService: SettingsService,
    private modals: ModalService
  ) { }

  ngOnInit(): void {
  }

  openPhotobooth(): void {
    this.modals.refs.push(
      this.bsModalService.show(PhotoboothComponent, {
        class: 'modal-dialog-centered app-modal--portrait position-relative w-100 h-100 m-auto',
        ignoreBackdropClick: true,
        keyboard: false,
        initialState: {
          closeCallback: () => {}
        }
      })
    );
  }


  openWall(): void {
    const data: Wall = {
      link: this.settingsService.getSettingsSnapshot()?.photobooth_gallery_url ||
            'https://vbth.togetherecmg2022.com/mosaic/globenatcon',
      modalTitle: 'mosaic wall',
      wallType: WallType.MOSAIC_WALL
    };

    this.modals.refs.push(
      this.bsModalService.show(WallComponent, {
        class: 'app-modal app-modal--lg app-modal--wall modal-dialog-centered',
        ignoreBackdropClick: true,
        keyboard: false,
        initialState: {
          wallData: data,
          closeCallback: () => {},
        },
      })
    );
  }

  openPreviewPdf(): void {
    const pdfData: PdfPreview = {
      file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      title: 'Program Schedule and Speakers',
      assetType: AssetType.PROGRAM_SCHEDULE,
      isSingleModal: true,
    };

    this.modals.refs.push(
      this.bsModalService.show(PreviewPdfComponent, {
        class: 'modal-dialog-centered app-modal app-modal--lg app-modal--auto-resize',
        ignoreBackdropClick: true,
        keyboard: false,
        initialState: {
          data: pdfData,
          closeCallback: () => {}
        }
      })
    );
  }

  openPreviewVideo(): void {
    const videoData: VideoPreview = {
      title: 'Test Video',
      video_url: 'https://player.vimeo.com/video/87110435',
      isSingleModal: true,
    };
    
    this.modals.refs.push(
      this.bsModalService.show(PreviewVideoComponent, {
        class: 'modal-dialog-centered app-modal app-modal--lg app-modal--auto-resize',
        ignoreBackdropClick: true,
        keyboard: false,
        initialState: {
          data: videoData,
          closeCallback: () => {}
        }
      })
    );
  }

  openBrochures(): void {
    const brochureData: Brochure = {
      title: 'Video Gallery',
      brochures: [],
      actionType: ActionType.PREVIEW_VIDEO,
    };

    this.modals.refs.push(
      this.bsModalService.show(BrochuresComponent, {
        class: 'modal-dialog-centered app-modal app-modal--lg app-modal--auto-resize',
        keyboard: false,
        ignoreBackdropClick: true,
        initialState: {
          data: brochureData,
          closeCallback: () => {}
        },
      })
    );
  }
}
