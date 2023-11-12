import { getImageMediaType } from '../utilities';
import type { ImageMediaType } from '../types';
import { readFile } from 'fs/promises';
import { Item } from './base';

export class Image extends Item {
  private data: Uint8Array;

  constructor(file: string, type: ImageMediaType, data: Uint8Array) {
    super(file, type);
    this.data = data;
  }

  static async read(file: string, src: string) {
    const content = await readFile(src);
    const media = getImageMediaType(src);
    if (media) {
      return new Image(file, media, content);
    } else {
      return undefined;
    }
  }

  async bundle() {
    return this.data;
  }
}
