import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ScaleService } from 'src/app/core/services/scale.service';
import { TidioService } from 'src/app/core/services/tidio.service';
import { BoothQuery } from 'src/app/core/states/booth/booth.query';
import { BoothImageType } from 'src/app/shared/enums/booth-image-type.enum';
import { ResourceType } from 'src/app/shared/enums/resource-type.enum';
import Panzoom from '@panzoom/panzoom';

@Component({
  selector: 'pfizer-booth',
  templateUrl: './booth.component.html',
  styleUrls: ['./booth.component.scss']
})
export class BoothComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('imageBase') imageBase: ElementRef;
  @ViewChild('parentContainer') parentContainer: ElementRef;

  @ViewChild('boothImage') boothImage: ElementRef;
  @ViewChild('backgroundImage') backgroundImage: ElementRef;

  booth: any;
  isLoadingImages: boolean;
  isPortrait: boolean;
  isMobile: boolean;

  constructor(
    private route: ActivatedRoute,
    private boothQuery: BoothQuery,
    private tidioService: TidioService,
    private loadingService: LoadingService,
    private scaleService: ScaleService
  ) { }

  ngOnInit() {
    this.isPortrait = innerHeight > innerWidth;
    this.isMobile = innerWidth < 900;

    const id$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id'))
    );
    id$.subscribe((id) => {
      this.booth = cloneDeep(this.boothQuery.getById(+id));
      this.loadBoothImages();
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tidioService.hideTidio();
    }, 900);

    this.loadingService.loading$.next(false);
    this.rescale();
    this.initZoom();

    setTimeout(() => {
      this.initBoothTidio();  
    }, 1000);
  }

  ngOnDestroy(): void {
    this.tidioService.removeBoothTidioScript();
    this.tidioService.createDefaultTidioScript();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.isPortrait = innerHeight > innerWidth;
    this.isMobile = innerWidth < 900;
    this.rescale();
  }

  getHotspotIcon(hotspot: any): any {
    const path = 'assets/images/hotspots/';

    switch (hotspot?.hotspot_info.resource_fields[0]) {
      case ResourceType.PDF:
        return path + 'booth-brochure.png';
      case ResourceType.AVP:
        return path + 'booth-video.png';
      case ResourceType.GAMES:
        return path + 'booth-game.png';
      case ResourceType.PHOTOBOOTH:
        return path + 'booth-photobooth.png';
      case ResourceType.EMBEDS:
        return path + 'booth-video.png';
      default:
        return path + 'booth-brochure.png';
    }
  }

  openResourceModal(hotspot): void {}

  private loadBoothImages(): void {
    this.isLoadingImages = true;
    zip(
      this.loadImage(
        this.booth.booth_info.image_url,
        BoothImageType.BOOTH
      ),
      this.loadImage(
        this.booth.booth_info.background_url,
        BoothImageType.BACKGROUND
      )
    ).subscribe(() => {
      this.isLoadingImages = false;
    });
  }

  private loadImage(url: any, type: any): any {
    return new Observable((obs) => {
      let preloaderImg = document.createElement('img');
      preloaderImg.src = url;
      preloaderImg.addEventListener('load', () => {
        const container =
          type === BoothImageType.BOOTH
            ? this.boothImage
            : this.backgroundImage;
        const encodedUrl = encodeURI(url);
        container.nativeElement.style.backgroundImage = `url(${encodedUrl})`;
        preloaderImg = null;
        obs.next(true);
        obs.complete();
      });
    });
  }

  private rescale(): void {
    const ratioWidth = 1453;
    const ratioHeight = 822;
    const parentWidth = this.parentContainer.nativeElement.offsetWidth;
    const parentHeight = this.parentContainer.nativeElement.offsetHeight;
    const formula = Math.min(
      parentWidth / parseFloat(ratioWidth.toString()),
      parentHeight / parseFloat(ratioHeight.toString())
    );

    const base = this.imageBase.nativeElement.style;
    base.width = parseFloat(ratioWidth.toString()) * formula + 'px';
    base.height = parseFloat(ratioHeight.toString()) * formula + 'px';
  }

  private initZoom(): void {
    if (this.scaleService.isiOS()) {
      return;
    }

    const elem = document.querySelector('#booth');
    const panzoom = Panzoom(elem as HTMLElement, {
      maxScale: 5,
      contain: 'outside',
      cursor: 'default',
    });
    elem.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);
  }

  private initBoothTidio(): void {
    const hotspot = this.booth?.hotspots?.find(
      (hotspot) => hotspot?.hotspot_info?.resource_fields[0] === ResourceType.CONTACT
    );

    if (typeof hotspot === 'undefined') {
      return;
    }

    if (!document.querySelector('#booth-script-container')) {
      const tidioChatIframe = document.querySelector('#tidio-chat-code');
      if (tidioChatIframe) {
        tidioChatIframe.remove();
      }

      const tidioChat = document.querySelector('#tidio-chat');
      if (tidioChat) {
        tidioChat.remove();
      }

      this.tidioService.removeDefaultTidioScript();

      setTimeout(() => {
        const boothScript = document.createElement('div');
        boothScript.setAttribute('id', 'booth-script-container');

        const boothTidio = document.createElement('script');
        boothTidio.setAttribute('type', 'text/javascript');
        boothTidio.setAttribute(
          'src',
          `//code.tidio.co/${hotspot.resource.contact_us.api_key}.js`
        );
        boothScript.append(boothTidio);

        document.body.appendChild(boothScript);
      }, 400);
    }
  }

}
