import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BoothStore, BoothState } from './booth.store';

import { find } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BoothQuery extends QueryEntity<BoothState, any> {

  constructor(protected store: BoothStore) {
    super(store);
  }
    
  getHotspots(id: any): any {
    const booth = find(this.getAll(), ['brand_info.id', id]);
    return booth ? booth.hotspots : [];
  }
}
