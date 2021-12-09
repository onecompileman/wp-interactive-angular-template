import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BoothStore, BoothState } from './booth.store';

@Injectable({
  providedIn: 'root'
})
export class BoothQuery extends QueryEntity<BoothState, any> {

  constructor(protected store: BoothStore) {
    super(store);
  }

  getById(id: any): any {
    return this.getAll().find((booth) => booth.booth_info.id === +id);
  }

}
