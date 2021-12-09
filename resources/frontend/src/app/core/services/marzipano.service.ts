import { Injectable } from '@angular/core';

import Marzipano from 'marzipano';
import { MarzipanoSettings } from 'src/app/shared/models/marzipano-settings.model';

@Injectable({
    providedIn: 'root',
})
export class MarzipanoService {
    
    constructor() {}

    initMarzipano(
        marzipanoSettings: MarzipanoSettings
    ): any {
        const container = document.getElementById(marzipanoSettings.containerId);
        // Create viewer.
        const viewer = new Marzipano.Viewer(container);

        // Create source.
        const source = Marzipano.ImageUrlSource.fromString(marzipanoSettings.bgImage);

        // Create geometry.
        const geometry = new Marzipano.EquirectGeometry([{ width: 4500 }]);

        // Create view.
        const limiter360 =  Marzipano.RectilinearView.limit.traditional(
            1024,
            (120 * Math.PI) / 180
        );

        const limiter180 = Marzipano.util.compose(
            Marzipano.RectilinearView.limit.traditional(
                800,
                (marzipanoSettings.zoom * Math.PI) / 180
            ),
            Marzipano.RectilinearView.limit.yaw(
                -Math.PI * 0.55,
                Math.PI * 0.35
            )
        );

        const view = new Marzipano.RectilinearView(
            { 
                yaw: marzipanoSettings.yaw, 
                pitch: marzipanoSettings.pitch 
            },
            (marzipanoSettings.is180 ? limiter180 : limiter360)
        );

        // Create scene.
        const scene = viewer.createScene({
            source: source,
            geometry: geometry,
            view: view,
            pinFirstLevel: true,
        });

        // Map hotspots.
        const hostpots = document.querySelectorAll('.spot');
        hostpots.forEach((hotspot) => {
            const perspectiveStr = hotspot.getAttribute('data-perspective');
            const perspective = perspectiveStr
                ? JSON.parse(perspectiveStr)
                : null;
            scene.hotspotContainer().createHotspot(
                hotspot,
                {
                    yaw: this.degreesToRadians(
                        +hotspot.getAttribute('data-yaw')
                    ),
                    pitch: this.degreesToRadians(
                        +hotspot.getAttribute('data-pitch')
                    ),
                },
                perspective
                    ? {
                          perspective,
                      }
                    : null
            );
        });

        // Display scene.
        scene.switchTo();

        return scene;
    }

    updateHotspotLocations(scene: any) {
        scene
            .hotspotContainer()
            .listHotspots()
            .forEach((hotspot) => {

                const perspectiveStr = hotspot
                    .domElement()
                    .getAttribute('data-perspective');
                const perspective = perspectiveStr
                    ? JSON.parse(perspectiveStr)
                    : null;

                hotspot.setPosition(
                    {
                        yaw: this.degreesToRadians(
                            hotspot.domElement().getAttribute('data-yaw')
                        ),
                        pitch: this.degreesToRadians(
                            hotspot.domElement().getAttribute('data-pitch')
                        ),
                    },
                    perspective
                        ? {
                              perspective,
                          }
                        : null
                );
            });
    }

    destroyAllHotspots(scene) {
        scene
            .hotspotContainer()
            .listHotspots()
            .forEach(hotspot => {
                scene.hotspotContainer().destroyHotspot(hotspot);
            });
    }

    degreesToRadians = (degrees: number) => {
        return degrees * (Math.PI / 180);
    };
}
