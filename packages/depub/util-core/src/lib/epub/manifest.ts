import type { MediaType } from '../types';

interface ManifestItemOptional {
  fallback?: string;
  mediaOverlay?: string;
  mediaType?: MediaType;
  properties?: string;
}

export class ManifestItem {
  #href: string;

  #id: string;

  #optional: ManifestItemOptional = {};

  constructor(href: string, id: string) {
    this.#href = href;
    this.#id = id;
  }

  update(info: ManifestItemOptional) {
    for (const [key, value] of Object.entries(info)) {
      if (value) {
        this.#optional[key as keyof ManifestItemOptional] = value;
      }
    }
    return this;
  }

  href() {
    return this.#href;
  }

  id() {
    return this.#id;
  }

  fallback() {
    return this.#optional.fallback;
  }

  mediaOverlay() {
    return this.#optional.mediaOverlay;
  }

  mediaType() {
    return this.#optional.mediaType;
  }

  properties() {
    return this.#optional.properties;
  }

  ref() {
    return new ManifestItemRef(this.#id);
  }
}

interface ManifestItemRefOptional {
  id?: string;
  linear?: string;
  properties?: string;
}

export class ManifestItemRef {
  #idref: string;

  #optional: ManifestItemRefOptional = {};

  constructor(idref: string) {
    this.#idref = idref;
  }

  update(info: ManifestItemRefOptional) {
    for (const [key, value] of Object.entries(info)) {
      if (value) {
        this.#optional[key as keyof ManifestItemRefOptional] = value;
      }
    }
    return this;
  }

  idref() {
    return this.#idref;
  }

  id() {
    return this.#optional.id;
  }

  linear() {
    return this.#optional.linear;
  }

  properties() {
    return this.#optional.properties;
  }
}
