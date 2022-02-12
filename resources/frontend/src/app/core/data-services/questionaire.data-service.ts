import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QuestionaireDataService {
    constructor(private restangular: Restangular) {}

    getAll(): Observable<any[]> {
        return this.restangular
            .all('api')
            .all('v2')
            .one('questionnaires')
            .get();
    }

    getAllByCategory(category: string) {}

    submitQuestionaireAnswers(answers: any, questionnaire_id: string) {
        return this.restangular
            .all('api')
            .all('v2')
            .all('questionnaire')
            .all('answer')
            .all('submit')
            .post({
                questionnaire_id,
                answers
            });
    }
}
