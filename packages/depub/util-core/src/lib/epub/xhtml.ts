import type { HTMLMeta } from '../types';
import { TextXHTML } from '../constants';
import { strToU8 } from 'fflate';
import { Item } from './base';

export class XHTML extends Item {
  #meta: HTMLMeta;

  #content: string;

  constructor(file: string, meta: HTMLMeta, content: string) {
    super(file, TextXHTML);
    this.#meta = meta;
    this.#content = content;
  }

  meta() {
    return this.#meta;
  }

  title() {
    return this.#meta.title;
  }

  language() {
    return this.#meta.language;
  }

  content() {
    return this.#content;
  }

  /**
   * @todo check encode format
   */
  async bundle() {
    return strToU8(this.#content);
  }
}
