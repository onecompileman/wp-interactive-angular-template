import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { LivestreamGuard } from '../core/guards/livestream.guard';
import { LobbyDeactivateGuard } from '../core/guards/lobby.deactivate-guard';
import { BoothComponent } from './booth/booth.component';
import { LandingLobbyComponent } from './landing-lobby/landing-lobby.component';
import { LivestreamComponent } from './livestream/livestream.component';
import { LobbyComponent } from './lobby.component';

const routes: Routes = [
	{
		path: '',
		component: LobbyComponent,
		canActivate: [AuthGuard],
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
				component: LivestreamComponent,
                canActivate: [LivestreamGuard]
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class LobbyRoutingModule {}
