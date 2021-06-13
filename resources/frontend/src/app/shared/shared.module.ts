import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';
import * as fromComponents from './components';
import * as fromDirectives from './directives';
import * as fromModals from './modals';
import * as fromPipes from './pipes';



@NgModule({
	declarations: [
		...fromModals.modals,
		...fromComponents.components,
		...fromPipes.pipes,
        ...fromDirectives.directives
	],
	imports: [
		AccordionModule.forRoot(),
		BsDropdownModule.forRoot(),
		ReactiveFormsModule,
		TooltipModule.forRoot(),
		FormsModule,
		CommonModule,
		ModalModule.forRoot()
	],
	exports: [
		...fromComponents.components,
		...fromPipes.pipes,
        ...fromDirectives.directives,
		AccordionModule, 
		TooltipModule, 
		ReactiveFormsModule, 
		FormsModule 
	],
	providers: [ TooltipConfig ]
})
export class SharedModule {}
