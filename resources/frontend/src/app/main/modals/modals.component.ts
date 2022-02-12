import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PhotoboothComponent } from 'src/app/shared/modals/photobooth/photobooth.component';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {

  constructor(
    private bsModalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  openPhotobooth(): void {
    this.bsModalService.show(PhotoboothComponent, {
      class: 'modal-dialog-centered app-modal--portrait position-relative w-100 h-100 m-auto',
      ignoreBackdropClick: true,
      keyboard: false,
      initialState: {
        closeCallback: () => {}
      }
    });
  }

}
