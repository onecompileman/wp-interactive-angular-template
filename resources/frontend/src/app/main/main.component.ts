import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    this.onWindowResize();
  }

  @HostListener('window:orientationchange')
  @HostListener('window:resize')
  onWindowResize(): void {
    document.documentElement.style.setProperty(
      '--app-height',
      `${window.innerHeight}px`
    );

    document.documentElement.style.setProperty(
      '--base-font-size',
      `${window.innerHeight / 35}px`
    );
  }
}
