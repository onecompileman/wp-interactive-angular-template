import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface AssetsState extends EntityState<any> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'booth' })
export class AssetsStore extends EntityStore<AssetsState, any> {

  constructor() {
    super();
  }

}

