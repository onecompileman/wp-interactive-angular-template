import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { AssetsQuery } from '../states/assets/assets.query';
import { AssetsService } from '../states/assets/assets.service';


@Injectable({
	providedIn: 'root'
})
export class AssetsResolver implements Resolve<any> {
	
	constructor(
		private assetsQuery: AssetsQuery,
		private assetsService: AssetsService
	) {}

	resolve(): Observable<any> {
		const assets = this.assetsQuery.getAll();
		if (assets.length) {
			return of(null);
		}

		return this.assetsService.init();
	}
}
