import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { QuestionaireStore } from './questionaire.store';
import { QuestionaireDataService } from '../../data-services/questionaire.data-service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class QuestionaireService {
    constructor(
        private questionaireStore: QuestionaireStore,
        private questionaireDataService: QuestionaireDataService
    ) {}

    init(): Observable<any> {
        return this.questionaireDataService.getAll().pipe(
            // tap(res => console.log(res)),
            map((res: any) =>
                [
                    ...(res.quiz || []).map((q) => ({ ...q, isQuiz: true })),
                    ...(res.survey || []),
                ].map((q) => ({
                    ...q,
                    id: q.questionnaire_id,
                }))
            ),
            tap((quizes) => {
                this.questionaireStore.set(quizes);
                // console.log({ quizes });
            })
        );
    }

    submitAnswers(answers: any, questionnaire_id: any): Observable<any> {
        return this.questionaireDataService
            .submitQuestionaireAnswers(answers, questionnaire_id)
            .pipe(
                tap(() =>
                    this.questionaireStore.update(questionnaire_id, {
                        done: true,
                    })
                )
            );
    }
}
