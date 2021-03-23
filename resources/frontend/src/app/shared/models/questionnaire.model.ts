export interface Questionnaire {
    done: boolean;
    questionnaire_id: number;
    name: string;
    questions: Question[];
}

export interface Question {
    question_id: number;
    question: string;
    choices: any;
}