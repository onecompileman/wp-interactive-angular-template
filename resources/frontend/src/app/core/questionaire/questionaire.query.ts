import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { QuestionaireStore, QuestionaireState } from './questionaire.store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class QuestionaireQuery extends QueryEntity<QuestionaireState, any> {
	constructor(protected store: QuestionaireStore) {
		super(store);
	}

	selectAllQuiz(): Observable<any[]> {
		return this.selectAll().pipe(map((quizes) => quizes.filter((q) => q.isQuiz)));
	}

	selectAllSurvey(): Observable<any[]> {
		return this.selectAll().pipe(map((quizes) => quizes.filter((q) => !q.isQuiz)));
	}
}
