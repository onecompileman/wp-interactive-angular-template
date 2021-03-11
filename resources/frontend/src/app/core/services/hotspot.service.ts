import { Injectable } from '@angular/core';

import { find } from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class HotspotService {
    
    constructor(
    ) {}

    getHotspotData(hotspots, hotspotId: number): any {
        const hotspot = find(hotspots, ['hotspot_info.id', hotspotId]);
        return hotspot ? hotspot : null
    }
}