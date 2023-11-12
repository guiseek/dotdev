import { TextXHTML } from '../constants';
import { readFile } from 'fs/promises';
import { strToU8 } from 'fflate';
import { Item } from './base';

export class HTML extends Item {
  private content: string;

  constructor(file: string, content: string) {
    super(file, TextXHTML);
    this.content = content;
  }

  static async read(src: string, dst: string) {
    if (!src.endsWith('.xhtml')) {
      return undefined;
    }
    const content = await readFile(src, 'utf-8');
    return new HTML(dst, content);
  }

  /**
   * @todo check encode format
   */
  async bundle() {
    return strToU8(this.content);
  }
}
