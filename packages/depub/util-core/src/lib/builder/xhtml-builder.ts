import type { HTMLMeta, XHTMLNode } from '../types';
import { Fragment, TextCSS } from '../constants';
import { XMLBuilder } from 'fast-xml-parser';
import { randomUUID } from 'node:crypto';
import { Style } from '../epub/style';
import { XHTML } from '../epub/xhtml';
import { basename } from 'pathe';

const builder = new XMLBuilder({
  format: true,
  ignoreAttributes: false,
  suppressUnpairedNode: false,
  unpairedTags: ['link'],
});

export class XHTMLBuilder {
  #meta: HTMLMeta = {
    language: 'en',
    title: '',
  };

  #filename: string;

  #head: XHTMLNode[] = [];

  #body: XHTMLNode[] = [];

  #bodyAttrs: Record<string, string> = {};

  constructor(filename: string) {
    this.#filename = filename;

    this.#meta.title = basename(filename);
  }

  language(value: string) {
    this.#meta.language = value;

    return this;
  }

  title(value: string) {
    this.#meta.title = value;

    return this;
  }

  style(...list: Array<string | Style>) {
    for (const href of list) {
      if (typeof href === 'string') {
        this.#head.push({
          tag: 'link',
          attrs: {
            href,
            rel: 'stylesheet',
            type: TextCSS,
          },
          children: [''],
        });
      } else {
        this.#head.push({
          tag: 'link',
          attrs: {
            href: href.relative(this.#filename),
            rel: 'stylesheet',
            type: TextCSS,
          },
          children: [''],
        });
      }
    }

    return this;
  }

  head(...node: XHTMLNode[]) {
    this.#head.push(...node);

    return this;
  }

  body(...node: XHTMLNode[]) {
    this.#body.push(...node);
    return this;
  }

  bodyAttrs(attrs: Record<string, string> = {}) {
    const a = Object.entries(attrs).map(([key, value]) => [`@_${key}`, value]);

    this.#bodyAttrs = {
      ...this.#bodyAttrs,
      ...Object.fromEntries(a),
    };

    return this;
  }

  build(): XHTML {
    const replacer: Record<string, string> = {};

    let content = builder.build({
      html: {
        '@_xmlns': 'http://www.w3.org/1999/xhtml',
        '@_xmlns:epub': 'http://www.idpf.org/2007/ops',
        '@_lang': this.#meta.language,
        '@_xml:lang': this.#meta.language,
        head: {
          title: this.#meta.title,
          ...list(this.#head),
        },
        body: {
          ...this.#bodyAttrs,
          ...list(this.#body),
        },
      },
    });

    for (const [key, value] of Object.entries(replacer)) {
      content = content.replace(key, value);
    }

    return new XHTML(this.#filename, this.#meta, content);

    function build(node: XHTMLNode) {
      const attrs = Object.fromEntries(
        Object.entries(node.attrs ?? {}).map(([key, value]) => [
          '@_' + key,
          value,
        ])
      );

      if (node.attrs && 'html' in node.attrs) {
        const id = `____${randomUUID()}____`;

        replacer[id] = node.attrs['html'];

        return { ...attrs, '@_html': undefined, '#text': id };
      } else {
        const obj = { ...attrs };

        if (Array.isArray(node.children)) {
          const text = node.children.filter(
            (c): c is string => typeof c === 'string'
          );

          const nodes = node.children.filter(
            (c): c is XHTMLNode => typeof c !== 'string'
          );

          if (text.length > 0) {
            obj['#text'] = text[0];
          }

          Object.assign(obj, list(nodes));
        }

        return obj;
      }
    }

    function list(list: XHTMLNode[]) {
      const obj: Record<string, string | ReturnType<typeof build>[]> = {};

      const nodes = list.flatMap((n) =>
        n.tag === Fragment ? n.children ?? [] : [n]
      );

      for (const c of nodes) {
        if (typeof c === 'string') {
          if (obj['#text']) {
            obj['#text'] += c;
          } else {
            obj['#text'] = c;
          }
        } else if (c.tag in obj) {
          const node = obj[c.tag];

          if (Array.isArray(node)) {
            node.push(build(c));
          }

          obj[c.tag] = node;
        } else {
          obj[c.tag] = [build(c)];
        }
      }

      return obj;
    }
  }
}
