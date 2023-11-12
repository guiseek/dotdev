import { ContentAsset } from '../interfaces/content-asset';

export const assetMap = (assets: ContentAsset[]) => {
  return assets.map((asset) => ({
    file: asset.file.replace('assets/content/', ''),
    meta: asset.meta,
  }));
};
