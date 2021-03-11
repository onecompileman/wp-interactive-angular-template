import { Injectable } from '@angular/core';
import { ProgramDataService } from '../data-services/program.data-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProgramService {
    programs$: BehaviorSubject<any[]> = new BehaviorSubject([]);

    constructor(private programDataService: ProgramDataService) {}

    init(): Observable<any> {
        return this.programDataService
            .getAll()
            .pipe(tap(programs => this.programs$.next(programs)));
    }
}
