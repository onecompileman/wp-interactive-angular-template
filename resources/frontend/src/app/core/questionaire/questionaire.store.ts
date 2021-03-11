import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface QuestionaireState extends EntityState<any> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'questionaire' })
export class QuestionaireStore extends EntityStore<QuestionaireState, any> {
    constructor() {
        super();
    }
}
