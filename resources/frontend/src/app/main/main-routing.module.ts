import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventGuard } from '../core/guards/event.guard';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main.component';
import { ModalsComponent } from './modals/modals.component';

const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{
                path: '',
                pathMatch: 'full',
                redirectTo: 'app',
            },
            {
                path: 'app',
                component: LandingComponent,
                canActivate: [EventGuard]
            },
            {
                path: 'modals',
                component: ModalsComponent
            },
            {
                path: 'lobby',
                loadChildren: () =>
                    import('../lobby/lobby.module').then((m) => m.LobbyModule),
            }
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class MainRoutingModule {}
