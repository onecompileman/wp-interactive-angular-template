import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TooltipModule, TooltipConfig } from 'ngx-bootstrap/tooltip';

@NgModule({
	declarations: [],
	imports: [
		AccordionModule.forRoot(),
		BsDropdownModule.forRoot(),
		ReactiveFormsModule,
		TooltipModule.forRoot(),
		FormsModule,
		CommonModule,
		ModalModule.forRoot()
	],
	exports: [ AccordionModule, TooltipModule, ReactiveFormsModule, FormsModule ],
	providers: [ TooltipConfig ]
})
export class SharedModule {}
