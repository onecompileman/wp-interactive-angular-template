import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Modals } from 'src/app/shared/enums/modals.enum';
import { environment } from 'src/environments/environment';
import { ModalService } from '../services/modal.service';

@Injectable({
  providedIn: 'root'
})
export class ModalsResolver implements Resolve<any> {
  constructor(private modalService: ModalService) {}

  resolve(): boolean {
    this.modalService.init();
    const prefix = environment.appPrefix;
    if (
      !localStorage.getItem(`${prefix}.welcome-modal`) ||
      localStorage.getItem(`${prefix}.welcome-modal`) === 'false'
    ) {
      this.modalService.addToQueue(Modals.WELCOME);
    }
    return true;
  }
}
