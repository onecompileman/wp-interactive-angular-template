import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private closeModal: BehaviorSubject<boolean> = new BehaviorSubject(true);
    refs: BsModalRef[] = [];

    constructor() {}

    closeAll(): void {
        this.refs.forEach(ref => {
            ref.hide();
        });

        this.refs = [];
    }

    close(isClose = true): any {
        this.closeModal.next(isClose);
    }

    getIsModalClosed(): Observable<boolean> {
        return this.closeModal;
    }

    rescale(): void {
        const ratioWidth = 1453;
        const ratioHeight = 822;
        const formula = Math.min(
            innerWidth / parseFloat(ratioWidth.toString()),
            innerHeight / parseFloat(ratioHeight.toString())
        );

        const base = document.querySelector(
            '.globe-modal-proportion'
        ) as HTMLElement;
        base.style.width = parseFloat(ratioWidth.toString()) * formula + 'px';
        base.style.height = parseFloat(ratioHeight.toString()) * formula + 'px';
    }
}
