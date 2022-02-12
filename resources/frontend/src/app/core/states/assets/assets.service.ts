import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AssetsDataService } from '../../data-services/assets.data.service';
import { AssetsStore } from './assets.store';


@Injectable({ providedIn: 'root' })
export class AssetsService {

    constructor(
        private assetsDataService: AssetsDataService,
        private assetsStore: AssetsStore
    ) {}

    init(): any {
        return this.assetsDataService.getAll().pipe(
            tap((assets: any) => this.assetsStore.set(assets.data))
        );
    }
}
