import { Injectable } from '@angular/core';

import { map, tap } from 'rxjs/operators';
import { filter } from 'lodash';

import { BoothStore } from './booth.store';
import { BehaviorSubject } from 'rxjs';
import { BoothDataService } from '../../data-services/booth.data.service';

@Injectable({ providedIn: 'root' })
export class BoothService {
    activeHallIndex$: BehaviorSubject<number> = new BehaviorSubject(0);

    constructor(
        private boothStore: BoothStore,
        private boothDataService: BoothDataService
    ) {}

    init(): any {
        return this.boothDataService.getAll().pipe(
          map((brand: any) => this.getBooths(brand)),
          tap((booths: any) => this.boothStore.set(booths))
        );
    }
    
    private getBooths(brand: any): any {
        const sponsorsWithBooth = filter(brand.data, brand => typeof brand['booths'] !== 'undefined');
        return sponsorsWithBooth.reduce((acc, data) => {
            data.booths.map(booth => {
                booth.id = booth.booth_info.id;
                booth.brand_info = data.brand_info;
                return booth;
            });
            acc.push(...data.booths);
            return acc;
        }, []);
    }
}
