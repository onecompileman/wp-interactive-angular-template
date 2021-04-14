export interface Booth {
    booth_info: {
      id: number;
      name: string;
      description: string;
      background_url: string;
      image_url: string;
    },
    brand_info: {
      id: number;
      logo: string;
    },
    hotspots: Hotspot[];
}

export interface Hotspot {
    hotspotInfo: HotspotInfo;
    resource: any;
}

export interface HotspotInfo {
    resource_fields: any;
    x: string;
    y: string;
    name: string;
}