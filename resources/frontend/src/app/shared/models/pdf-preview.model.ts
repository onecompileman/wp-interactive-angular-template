import { AssetType } from "../enums/asset-type.enum";

export interface PdfPreview {
	title: string;
    file_url: string;
    isSingleModal?: boolean;
    isBreakoutPage?: boolean;
    breakoutType?: string;
    isZoomed?: boolean;
    assetType: AssetType;
}
