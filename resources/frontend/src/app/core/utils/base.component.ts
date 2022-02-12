import { Component, ElementRef, HostListener, AfterViewInit, ViewChild, OnInit } from '@angular/core';

@Component({
  template: '',
})
export abstract class BaseComponent implements OnInit, AfterViewInit {
    @ViewChild('') parentContainer: ElementRef;
    @ViewChild('') base: ElementRef;
    ratioWidth: number;
    ratioHeight: number;
    customFontSize: number;

    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.rescale(this.ratioWidth, this.ratioHeight, this.customFontSize);
        }, 100);
    }

    @HostListener('window:resize')
    onWindowResize(): void {
        this.rescale(this.ratioWidth, this.ratioHeight, this.customFontSize);
    }

    @HostListener('window:orientationchange')
    onOrientationChange(): void {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        }, 1000);
    }

    rescale(ratioWidth: number, ratioHeight: number, customFontSize?: number): void {
        this.ratioWidth = ratioWidth;
        this.ratioHeight = ratioHeight;
        this.customFontSize = customFontSize ? customFontSize : null;
        const parentWidth = this.parentContainer.nativeElement.offsetWidth;
        const parentHeight = this.parentContainer.nativeElement.offsetHeight;
        const formula = Math.min(
            parentWidth / parseFloat(ratioWidth.toString()),
            parentHeight / parseFloat(ratioHeight.toString())
        );
        const base = this.base.nativeElement.style;
        base.width = parseFloat(ratioWidth.toString()) * formula + 'px';
        base.fontSize = parseFloat(ratioWidth.toString()) * formula / (customFontSize ? (window.innerWidth <= 600 ? customFontSize : 16) : 16) + 'px';
    }
}
