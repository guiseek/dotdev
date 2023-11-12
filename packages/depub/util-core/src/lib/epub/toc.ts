import type { HTMLMeta, NavList, NavOption, XHTMLNode } from '../types';
import { navList } from '../utilities/nav';
import { XHTMLBuilder } from '../builder';
import { h } from '../utilities';
import { XHTML } from './xhtml';

export class Toc extends XHTML {
  constructor(file: string, meta: HTMLMeta, content: string) {
    super(file, meta, content);
    this.update({ properties: 'nav' });
  }

  static from(xhtml: XHTML) {
    return new Toc(xhtml.filename(), xhtml.meta(), xhtml.content());
  }

  static generate(
    file: string,
    nav: NavList,
    {
      title = 'Nav',
      heading = 1,
      titleAttrs = {},
      builder,
    }: Partial<NavOption<XHTMLBuilder>> = {}
  ) {
    if (!builder) {
      builder = new XHTMLBuilder(file);
    }

    const root = {
      tag: 'nav',
      attrs: {
        'epub:type': 'toc',
      },
      children: [] as XHTMLNode[],
    } satisfies XHTMLNode;

    root.children.push(h('h' + heading, titleAttrs, title));
    root.children.push(navList(nav));

    return builder.body(root);
  }
}
