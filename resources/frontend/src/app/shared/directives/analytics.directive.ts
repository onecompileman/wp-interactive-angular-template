import { Directive, HostListener, Input } from '@angular/core';
import { AnalyticsService } from 'src/app/core/services/analytics.service';

@Directive({
  selector: '[xAnalytics]'
})
export class AnalyticsDirective {
  @Input() xAnalytics: any;

  constructor(private analyticsService: AnalyticsService) { }

  @HostListener('click',['$event'])
  triggerAnalytics(){
    this.analyticsService.clickEvent(this.xAnalytics);
  }

}
