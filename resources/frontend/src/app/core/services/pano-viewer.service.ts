import { Injectable, ViewRef } from '@angular/core';

import { PanoViewer } from '@egjs/view360';

@Injectable({
    providedIn: 'root'
})
export class PanoViewerService {
    load360(
        params: any,
        lastpitch = 10,
        lastyaw = 95,
        saveLastViewCallback?,
        otherParams?
    ): void {
        var container = document.querySelector(params.parentClass);
        var hotspots = Array.prototype.slice.call(
            document.querySelectorAll('.hotspot')
        );

        function toRadian(deg) {
            return (deg * Math.PI) / 180;
        }

        function getHFov(fov) {
            var rect = container.getBoundingClientRect();
            var width = rect.width;
            var height = rect.height;
            return (
                (Math.atan((width / height) * Math.tan(toRadian(fov) / 2)) /
                    Math.PI) *
                360
            );
        }

        function rotate(point, deg) {
            var rad = toRadian(deg);
            var cos = Math.cos(rad);
            var sin = Math.sin(rad);

            return [
                cos * point[0] - sin * point[1],
                sin * point[0] + cos * point[1]
            ];
        }

        function setHotspotOffset(hotspot, viewer) {
            var oyaw = viewer.getYaw();
            var opitch = viewer.getPitch();
            var yaw = parseFloat(hotspot.getAttribute('data-yaw'));
            var pitch = parseFloat(hotspot.getAttribute('data-pitch'));
            var deltaYaw = yaw - oyaw;
            var deltaPitch = pitch - opitch;

            if (deltaYaw < -180) {
                deltaYaw += 360;
            } else if (deltaYaw > 180) {
                deltaYaw -= 360;
            }
            if (Math.abs(deltaYaw) > 90) {
                hotspot.style.transform = 'translate(-200px, 0px)';
                return;
            }
            var radYaw = toRadian(deltaYaw);
            var radPitch = toRadian(deltaPitch);

            var fov = viewer.getFov();
            var hfov = getHFov(fov);

            var rx = Math.tan(toRadian(hfov) / 2);
            var ry = Math.tan(toRadian(fov) / 2);

            var point = [Math.tan(-radYaw) / rx, Math.tan(-radPitch) / ry];

            var left = viewer._width / 2 + (point[0] * viewer._width) / 2;
            var top = viewer._height / 2 + (point[1] * viewer._height) / 2;

            hotspot.style.transform =
                'translate(' +
                left +
                'px, ' +
                top +
                'px) translate(-50%, -50%)';
        }

        function setHotspotOffsets(viewer) {
            hotspots.forEach(function(hotspot) {
                setHotspotOffset(hotspot, viewer);
            });
        }

        let viewerConfig = {
            image: params.imagePath,
            // width: 4000,
            useZoom: false,
            yawRange: [-180, 180],
            pitchRange: [-55, 55],
            pitch: 5,
            yaw: lastyaw,
            projectionType: PanoViewer.PROJECTION_TYPE.EQUIRECTANGULAR,
            gyroMode: PanoViewer.GYRO_MODE.NONE
        };

        if (otherParams) {
            viewerConfig = {
                ...viewerConfig,
                ...otherParams
            };
        }

        var viewer = new PanoViewer(
            document.getElementById('globe-360-container'),
            viewerConfig
        )
            .on('ready', function(e) {
                console.log('here', e);
                viewer.lookAt({
                    fov: 205
                });
                setTimeout(() => {
                    console.log(otherParams);
                    viewer.lookAt(
                        {
                            fov: otherParams ? 90 : 65
                        },
                        500
                    );
                    setHotspotOffsets(viewer);
                }, 50);
            })
            .on('viewChange', function(e) {
                setHotspotOffsets(viewer);
            });

        window.addEventListener('resize', function(e) {
            viewer.updateViewportDimensions();
            setHotspotOffsets(viewer);
        });

        setTimeout(() => dispatchEvent(new Event('resize')), 200);
    }
}
