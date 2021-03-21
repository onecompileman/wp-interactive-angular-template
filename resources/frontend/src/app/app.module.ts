import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { environment } from 'src/environments/environment';

export function RestangularConfigFactory(RestangularProvider) {
	RestangularProvider.setBaseUrl(environment.api.endpoint);
	RestangularProvider.setPlainByDefault(true);
	RestangularProvider.setDefaultHeaders({
		'X-CSRF-TOKEN': document.querySelector('meta[name="csrf"]').getAttribute('content')
	});
}

@NgModule({
	declarations: [ AppComponent ],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		AppRoutingModule,
		SharedModule,
		RouterModule,
		RestangularModule.forRoot(RestangularConfigFactory)
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
