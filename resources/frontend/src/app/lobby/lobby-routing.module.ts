import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyComponent } from './lobby.component';
import { BoothComponent } from './booth/booth.component';
import { LivestreamComponent } from './livestream/livestream.component';
import { LandingLobbyComponent } from './landing-lobby/landing-lobby.component';

const routes: Routes = [
	{
		path: '',
		component: LobbyComponent,
		children: [
			{
				path: 'home',
				component: LandingLobbyComponent
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
