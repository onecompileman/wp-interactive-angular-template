import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('././main/main.module').then((m) => m.MainModule),
		data: {
			pageTitle: 'Manulife'
		}
	},
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { useHash: true}) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
