import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Asset } from 'src/app/shared/models/asset.model';
import { AssetsState, AssetsStore } from './assets.store';

@Injectable({
  providedIn: 'root'
})
export class AssetsQuery extends QueryEntity<AssetsState, any> {

  constructor(protected store: AssetsStore) {
    super(store);
  }

  getAssetsByType(type: string): Asset[] {
    const assets = this.getAll().filter((asset) =>
      asset.type.toLowerCase() === type.toLowerCase()
    );
    return assets.map(asset => this.mapProperties(asset));
  }

  getAssetById(id: number): Asset {
    const asset = this.getAll().find((asset) =>
      +asset.id === +id
    );
    return this.mapProperties(asset);
  }

  private mapProperties(asset: any): Asset {
    return {
      id: asset?.id,
      title: asset?.title,
      file_url: asset?.attachments?.asset_url,
      video_url: asset?.video_url,
      video_replay_url: asset?.video_replay_url,
      description: asset?.description,
      description_2: asset?.description_2,
      thumbnail: asset?.video_thumbnail_url,
      subcategory: asset.subcategory
    }
  }
}
