import { readFile } from 'fs/promises';
import { TextCSS } from '../constants';
import { strToU8 } from 'fflate';
import { Item } from './base';

export class Style extends Item {
  #content: string;

  constructor(file: string, content: string) {
    super(file, TextCSS);
    this.#content = content;
  }

  static async read(src: string, dst: string) {
    if (!src.endsWith('.css')) {
      return undefined;
    }
    const content = await readFile(src, 'utf-8');
    return new Style(dst, content);
  }

  /**
   * @todo check encode format
   */
  async bundle() {
    return strToU8(this.#content);
  }
}
