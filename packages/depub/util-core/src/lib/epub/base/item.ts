import type { MediaType } from '../../types';
import { ManifestItem } from '../manifest';
import { dirname, relative } from 'pathe';

export abstract class Item {
  readonly #file: string;

  readonly #mediaType: MediaType;

  #properties?: string;

  constructor(file: string, mediaType: MediaType) {
    this.#file = file;
    this.#mediaType = mediaType;
  }

  filename() {
    return this.#file;
  }

  relative(from: string) {
    return relative(dirname(from), this.#file);
  }

  update(info: Partial<{ properties: string }>) {
    if (info.properties) {
      this.#properties = info.properties;
    }
    return this;
  }

  id() {
    return this.#file.replace(/\/|\\/g, '_').replace(/\.[\w]+$/, '');
  }

  manifest() {
    return new ManifestItem(this.#file, this.id()).update({
      mediaType: this.#mediaType,
      properties: this.#properties,
    });
  }

  itemref() {
    return this.manifest().ref();
  }

  abstract bundle(): Promise<Uint8Array>;
}
