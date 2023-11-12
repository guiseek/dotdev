import type { NavList, NavOption, PackageDocumentMeta } from '../types';
import { PackageDocument } from './package-document';
import { existsSync, mkdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { XHTMLBuilder } from '../builder';
import { Item } from './base';
import { dirname } from 'pathe';

export class Epub {
  /**
   * See: https://www.w3.org/TR/epub-33/#sec-package-doc
   *
   * Now, it only supports single opf (OEBPS/content.opf)
   *
   * @returns list of package documents
   */
  #opfs: PackageDocument[] = [new PackageDocument('OEBPS/content.opf')];

  constructor(meta: Partial<PackageDocumentMeta> = {}) {
    this.#opfs[0].update(meta);
  }

  packages(): PackageDocument[] {
    return this.#opfs;
  }

  main() {
    return this.#opfs[0];
  }

  item(...items: Item[]) {
    for (const item of items) {
      this.#opfs[0].addItem(item);
    }
    return this;
  }

  toc(nav: NavList, option: Partial<NavOption<XHTMLBuilder>> = {}) {
    this.#opfs[0].setToc(nav, option);
    return this;
  }

  spine(...items: Item[]) {
    this.#opfs[0].setSpine(items);
    return this;
  }

  async bundle() {
    const { bundle } = await import('../bundle');
    return await bundle(this);
  }

  async writeFile(file: string) {
    const buffer = await this.bundle();
    const dir = dirname(file);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    await writeFile(file, buffer);
  }
}
