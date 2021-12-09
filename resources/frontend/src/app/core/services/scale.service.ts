import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ScaleService {

	constructor() {}

    calculateImageBase(parentContainer: any): any {
        const ratioWidth = 705;
        const ratioHeight = 536;
        const parentWidth = parentContainer.nativeElement.offsetWidth;
        const parentHeight = parentContainer.nativeElement.offsetHeight;
        const formula = Math.min(
        parentWidth / parseFloat(ratioWidth.toString()),
        parentHeight / parseFloat(ratioHeight.toString())
        );

        return {
            width: parseFloat(ratioWidth.toString()) * formula + 'px',
            height: parseFloat(ratioHeight.toString()) * formula + 'px'
        }
    }

    isiOS() {
        return (
            [
                'iPad Simulator',
                'iPhone Simulator',
                'iPod Simulator',
                'iPad',
                'iPhone',
                'iPod',
            ].includes(navigator.platform) ||
            // iPad on iOS 13 detection
            (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
        );
    }

    isPortrait(): boolean {
        return this.readDeviceOrientation() === 'portrait';
    }

    readDeviceOrientation(): string {
        switch (window.orientation) {
            case 0:
            case 180:
                return 'portrait';
            case -90:
            case 90:
                return 'landscape';
        }
    }

    setDraggablePdf(containerId): void {
        const ele = document.getElementById(containerId);
        ele.style.cursor = 'grab';
        let pos = {
            top: 0,
            left: 0,
            x: 0,
            y: 0
        };
        const mouseDownHandler = function (e) {
            ele.style.cursor = 'grabbing';
            ele.style.userSelect = 'none';
            pos = {
                left: ele.scrollLeft,
                top: ele.scrollTop,
                // Get the current mouse position
                x: e.clientX,
                y: e.clientY,
            };
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };
        const mouseMoveHandler = function (e) {
            // How far the mouse has been moved
            const dx = e.clientX - pos.x;
            const dy = e.clientY - pos.y;
            // Scroll the element
            ele.scrollTop = pos.top - dy;
            ele.scrollLeft = pos.left - dx;
        };
        const mouseUpHandler = function () {
            ele.style.cursor = 'grab';
            ele.style.removeProperty('user-select');
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };
        // Attach the handler
        ele.addEventListener('mousedown', mouseDownHandler);
    }
}
