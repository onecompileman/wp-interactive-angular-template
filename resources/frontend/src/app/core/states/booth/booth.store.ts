import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface BoothState extends EntityState<any> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'booth' })
export class BoothStore extends EntityStore<BoothState, any> {

  constructor() {
    super();
  }

}

