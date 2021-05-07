import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyComponent } from './lobby.component';
import { BoothComponent } from './booth/booth.component';
import { LivestreamComponent } from './livestream/livestream.component';
import { LandingLobbyComponent } from './landing-lobby/landing-lobby.component';
import { LobbyDeactivateGuard } from '../core/guards/lobby.deactivate-guard';

const routes: Routes = [
	{
		path: '',
		component: LobbyComponent,
		children: [
			{
				path: 'home',
				component: LandingLobbyComponent,
				canDeactivate: [ LobbyDeactivateGuard ]
			},
			{
				path: 'booth',
				component: BoothComponent
			},
			{
				path: 'livestream',
				component: LivestreamComponent
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class LobbyRoutingModule {}
