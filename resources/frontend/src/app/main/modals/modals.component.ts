import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/core/services/modal.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { WallType } from 'src/app/shared/enums/wall-type.enum';
import { WallComponent } from 'src/app/shared/modals';
import { PhotoboothComponent } from 'src/app/shared/modals/photobooth/photobooth.component';
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
}
