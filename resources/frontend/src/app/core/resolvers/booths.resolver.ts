import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { BoothQuery } from '../states/booth/booth.query';
import { BoothService } from '../states/booth/booth.service';


@Injectable({
	providedIn: 'root'
})
export class BoothsResolver implements Resolve<any> {
	
	constructor(
		private boothQuery: BoothQuery,
		private boothService: BoothService
	) {}

	resolve(): Observable<any> {
		const booths = this.boothQuery.getAll();
		if (booths.length) {
			return of(null);
		}

		return this.boothService.init();
	}
}
