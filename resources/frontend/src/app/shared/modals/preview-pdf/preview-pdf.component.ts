import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ScaleService } from 'src/app/core/services/scale.service';
import { SoundManagerService } from 'src/app/core/services/sound-manager.service';
import { TidioService } from 'src/app/core/services/tidio.service';
import { BaseComponent } from 'src/app/core/utils/base.component';
import { ModalService } from '../../../core/services/modal.service';
import { Asset } from '../../models/asset.model';
import { PdfPreview } from '../../models/pdf-preview.model';

@Component({
    selector: 'app-preview-pdf',
    templateUrl: './preview-pdf.component.html',
    styleUrls: ['./preview-pdf.component.scss'],
})
export class PreviewPdfComponent
    extends BaseComponent
    implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild('parentContainer') parentContainer: ElementRef;
    @ViewChild('base') base: ElementRef;

    isIOS: boolean;
    isPdfLoading: boolean;
    zoom_to: any;

    // initial state
    hideTidioOnClose: boolean;
    data: PdfPreview;
    brochureData: Asset;
    closeCallback: Function;

    constructor(
        private bsModalRef: BsModalRef,
        private modalService: ModalService,
        private tidioService: TidioService,
        private soundManagerService: SoundManagerService,
        private scaleService: ScaleService
    ) {
        super();
    }

    ngOnInit(): void {
        super.parentContainer = this.parentContainer;
        super.base = this.base;

        this.tidioService.hideTidio();
        this.soundManagerService.stopBackgroundMusic();
        this.zoom_to = 0.9;
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            super.rescale(700, 500);
        }, 100);
        this.scaleService.setDraggablePdf('pdfWrapper');
    }

    ngOnDestroy(): void {
        if (this.hideTidioOnClose) {
            return;
        }

        if (this.data.isSingleModal) {
            this.tidioService.showTidio();
            this.soundManagerService.playBackgroundMusic();
            return;
        }

        this.tidioService.hideTidio();
        this.soundManagerService.stopBackgroundMusic();
    }

    close(): void {
        this.modalService.killDoubleModal();
        this.bsModalRef.hide();

        if (this.closeCallback) {
            this.closeCallback();
        }
    }

    pdfLoaded(): void {
        this.isPdfLoading = false;
    }

    zoomIn(): void {
        this.zoom_to = this.zoom_to + 0.25;
    }

    zoomOut(): void {
        if (this.zoom_to > 0.9) {
            this.zoom_to = this.zoom_to - 0.25;
        }
    }
}
