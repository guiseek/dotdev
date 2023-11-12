import type { NavList, NavOption, PackageDocumentMeta } from '../types';
import { ManifestItemRef } from './manifest';
import { XHTMLBuilder } from '../builder';
import { randomUUID } from 'node:crypto';
import { createDefu } from 'defu';
import { Item } from './base';
import { Toc } from './toc';

const defu = createDefu(
  <T>(obj: Partial<T>, key: keyof T, value: T): boolean | void => {
    if (obj[key] instanceof Date && value instanceof Date) {
      obj[key] = value as T[keyof T];
      return true;
    }
  }
);

export class PackageDocument {
  readonly #file: string;

  readonly #SpecVersion = '3.0';

  #uniqueIdentifier = 'uuid';

  #identifier: string = randomUUID();

  #metadata: PackageDocumentMeta = {
    title: '',
    language: 'pt-BR',
    contributor: [],
    coverage: '',
    creator: {
      name: 'unknown',
      uid: 'creator',
    },
    date: new Date(),
    description: '',
    format: '',
    publisher: '',
    relation: '',
    rights: '',
    source: '',
    subject: '',
    type: '',
    lastModified: new Date(),
  };

  #toc?: Toc;

  #items: Item[] = [];

  #spine: ManifestItemRef[] = [];

  constructor(file: string) {
    this.#file = file;
  }

  filename() {
    return this.#file;
  }

  version() {
    return this.#SpecVersion;
  }

  /**
   * Metadata
   * @todo valiate input data
   */
  update(info: Partial<PackageDocumentMeta>) {
    this.#metadata = defu(info, this.#metadata);
    return this;
  }

  title() {
    return this.#metadata.title;
  }

  language() {
    return this.#metadata.language;
  }

  creator() {
    return this.#metadata.creator;
  }

  metadata() {
    return this.#metadata;
  }

  /**
   * Manifest
   */
  addItem(item: Item) {
    this.#items.push(item);
    return this;
  }

  items() {
    const l = [...this.#items];
    if (this.#toc) {
      l.push(this.#toc);
    }
    return l;
  }

  manifest() {
    return this.items().map((i) => i.manifest());
  }

  /**
   * Navigation
   */
  spine() {
    return this.#spine;
  }

  setSpine(items: Item[]) {
    this.#spine.splice(0, this.#spine.length, ...items.map((i) => i.itemref()));
    return this;
  }

  toc() {
    return this.#toc;
  }

  setToc(nav: NavList, option: Partial<NavOption<XHTMLBuilder>> = {}) {
    const toc = Toc.generate('nav.xhtml', nav, option);
    if (!option.builder) {
      toc.title(option.title ?? 'Nav').language(this.#metadata.language);
    }
    this.#toc = Toc.from(toc.build());
    return this;
  }

  /**
   * Identifier
   */
  uniqueIdentifier() {
    return this.#uniqueIdentifier;
  }

  identifier() {
    return this.#identifier;
  }

  setIdentifier(identifier: string, uniqueIdentifier = 'uuid') {
    this.#identifier = identifier;
    this.#uniqueIdentifier = uniqueIdentifier;
  }
}
