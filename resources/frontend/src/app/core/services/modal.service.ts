import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PushNotificationService } from './push-notification.service';
import { Modals } from 'src/app/shared/enums/modals.enum';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private closeModal: BehaviorSubject<boolean> = new BehaviorSubject(true);
    refs: BsModalRef[] = [];

    modalQueue: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
    currentOpenModal: number;
    namedModalRefs: any = {};
    queueSub: Subscription;

    constructor(
        private pushNotifService: PushNotificationService,
        private bsModalService: BsModalService
    ) {}

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

    init(): void {
        this.listenToQueue();
    }

    kill(): void {
        if (!!this.queueSub) {
            this.queueSub.unsubscribe();
        }
    }

    listenToQueue(): void {
        this.queueSub = this.getModalQueue$()
            .pipe(
            debounceTime(500), // necessary para makuha muna lahat ng modals na i-queue
            distinctUntilChanged()
        )
        .subscribe(queue => {
            if (queue.length && this.currentOpenModal !== queue[0]) {
                this.currentOpenModal = queue[0];
                switch (queue[0]) {
                case Modals.LIVESTREAM:
                    this.openHallStatusModal();
                    break;
                case Modals.PUSH:
                    this.openPushNotification();
                    break;
                case Modals.WELCOME:
                    this.openWelcomeModal();
                    break;
                }
            } else {
                this.currentOpenModal = null;
            }
        });
    }

    getModalQueue$(): Observable<number[]> {
        return this.modalQueue.asObservable();
    }

    addToQueue(queueItem: number): void {
        const items = this.modalQueue.getValue();
        if (items.includes(queueItem)) {
            return;
        }
        this.setQueue([...items, queueItem]);
    }

    dequeue(queueName: number): void {
        this.closeGlobalModal(this.getModalKey(queueName));

        const queue = this.modalQueue.getValue();
        const newValue = queue.filter(item => item !== queueName);
        this.setQueue(newValue);
        }

    setQueue(items: number[]): void {
        const orderedItems = items.sort();
        this.modalQueue.next(orderedItems);
    }

    closeGlobalModal(modalName: string): void {
        if (this.namedModalRefs[modalName]) {
            this.namedModalRefs[modalName].hide();
            delete this.namedModalRefs[modalName];
        }
    }

    closeAllOpenModals(): void {
        Object.keys(this.namedModalRefs).forEach(modalKey => {
            if (this.namedModalRefs.hasOwnProperty(modalKey)) {
                this.closeGlobalModal(modalKey);
            }
        });
    }

    isNameModalOpen(modalName: string): boolean {
        return this.namedModalRefs[modalName];
    }

    killAll(): void {
        this.currentOpenModal = null;
        this.setQueue([]);
        this.pushNotifService.toggle(false);
        this.closeAllOpenModals();
    }

    openHallStatusModal(): void {
        if (this.namedModalRefs['livestream']) {
            return;
        }
        // TODO: call hall status modal
        // this.namedModalRefs['livestream'] = 
    }

    private openPushNotification(): void {
        if (this.namedModalRefs['push']) {
            return;
        }

        // TODO: call push notif modal
        // this.namedModalRefs['push'] = 
    }

    private openWelcomeModal(): void {
        if (this.namedModalRefs['welcome']) {
            return;
        }
    
        // TODO: call welcome modal
        this.namedModalRefs['welcome'] = 
    }

    private getModalKey(modalOrder: number): string {
        const modalNames = {
          [Modals.WELCOME]: 'welcome',
          [Modals.PUSH]: 'push',
          [Modals.LIVESTREAM]: 'livestream'
        };
        return modalNames[modalOrder];
    }
}
