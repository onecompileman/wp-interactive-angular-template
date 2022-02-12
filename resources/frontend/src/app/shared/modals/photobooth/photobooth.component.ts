import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener, OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ScaleService } from 'src/app/core/services/scale.service';
import { SoundManagerService } from 'src/app/core/services/sound-manager.service';
import { TidioService } from 'src/app/core/services/tidio.service';

@Component({
    selector: 'app-photobooth',
    templateUrl: './photobooth.component.html',
    styleUrls: ['./photobooth.component.scss'],
})
export class PhotoboothComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('parentContainer') parentContainer: ElementRef;
    @ViewChild('base') base: ElementRef;

    isPortrait: boolean;
    isMobile: boolean;
    isIOS: boolean;

    // initial state
    name: string;
    link: any;
    isBoomerang: boolean;
    closeCallback: Function;

    constructor(
        public bsModalRef: BsModalRef,
        private tidioService: TidioService,
        private soundManagerService: SoundManagerService,
        private scaleService: ScaleService
    ) {}

    @HostListener('window:resize')
    onWindowResize(): void {
        this.isPortrait =
            document.documentElement.clientHeight >
            document.documentElement.clientWidth;
        this.isMobile = document.documentElement.clientWidth < 900;

        if (this.isIOS) {
            setTimeout(() => {
                this.rescale();
            }, 300);
        } else {
            this.rescale();
        }
    }

    @HostListener('window:orientationchange')
    onOrientationChange(): void {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        }, 1000);
    }

    ngOnInit(): void {
        this.tidioService.hideTidio();
        this.isPortrait =
            document.documentElement.clientHeight >
            document.documentElement.clientWidth;
        this.isMobile = document.documentElement.clientWidth < 900;
        this.isIOS = this.scaleService.isiOS();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.rescale();
        }, 100);
    }

    ngOnDestroy(): void {
        this.soundManagerService.playBackgroundMusic();
        this.tidioService.showTidio();
        if (this.closeCallback) {
            this.closeCallback();
        }
    }

    close(): void {
        this.bsModalRef.hide();
        this.closeCallback();
    }

    private rescale(): void {
        const ratioWidth = 405;
        const ratioHeight = 720;
        const parentWidth = this.parentContainer.nativeElement.offsetWidth;
        const parentHeight = this.parentContainer.nativeElement.offsetHeight;
        const formula = Math.min(
            parentWidth / parseFloat(ratioWidth.toString()),
            parentHeight / parseFloat(ratioHeight.toString())
        );
        const base = this.base.nativeElement.style;
        base.width = parseFloat(ratioWidth.toString()) * formula + 'px';
        base.height = parseFloat(ratioHeight.toString()) * formula + 'px';
    }
}
