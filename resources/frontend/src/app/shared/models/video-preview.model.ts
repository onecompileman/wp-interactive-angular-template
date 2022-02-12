export interface VideoPreview {
    id?: number;
	title: string;
    video_url: string;
    isSingleModal?: boolean;
    presentors?: string;
    isLandingPage?: boolean;
    isBoothVideo?: boolean;
    watched?: boolean;
}
