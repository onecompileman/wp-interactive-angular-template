import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { Modals } from 'src/app/shared/enums/modals.enum';

@Injectable({
  providedIn: 'root'
})
export class ModalsResolver implements Resolve<any> {
  constructor(private modalService: ModalService) {}

  resolve(): boolean {
    this.modalService.init();
    // TODO: set localstorage app prefix
    if (
      !localStorage.getItem('app.welcome-modal') ||
      localStorage.getItem('app.welcome-modal') === 'false'
    ) {
      this.modalService.addToQueue(Modals.WELCOME);
    }
    return true;
  }
}
