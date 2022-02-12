import { Asset } from "./asset.model";

export interface Brochure {
    title: string;
    actionType: string;
    brochures?: Asset[];
}
