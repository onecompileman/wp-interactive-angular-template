import { BrochuresComponent } from "./brochures/brochures.component";
import { PhotoboothComponent } from "./photobooth/photobooth.component";
import { PreviewPdfComponent } from "./preview-pdf/preview-pdf.component";
import { PreviewVideoComponent } from "./preview-video/preview-video.component";
import { WallComponent } from "./wall/wall.component";

export const modals: any[] = [
  PhotoboothComponent,
  WallComponent,
  PreviewPdfComponent,
  PreviewVideoComponent,
  BrochuresComponent
];

export * from './photobooth/photobooth.component';
export * from './wall/wall.component';
export * from './preview-pdf/preview-pdf.component';
export * from './preview-video/preview-video.component';
export * from './brochures/brochures.component';




