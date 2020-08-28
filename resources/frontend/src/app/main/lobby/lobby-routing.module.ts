import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyComponent } from './lobby.component';
import { BoothComponent } from './booth/booth.component';
import { PlenaryStreamComponent } from './plenary-stream/plenary-stream.component';
import { BreakoutStreamComponent } from './breakout-stream/breakout-stream.component';

const routes: Routes = [
	{
		path: '',
		component: LobbyComponent,
		children: [
			{
				path: 'booth',
				component: BoothComponent
			},
			{
				path: 'plenary-stream',
				component: PlenaryStreamComponent
			},
			{
				path: 'breakout-stream',
				component: BreakoutStreamComponent
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class LobbyRoutingModule {}
