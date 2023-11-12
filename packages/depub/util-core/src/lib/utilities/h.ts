import { Fragment } from '../constants';
import { XHTMLNode } from '../types';

export function h(
  tag: string,
  attrs: Record<string, string> = {},
  ...children: Array<string | XHTMLNode | Array<string | XHTMLNode>>
) {
  const sub = children
    .flatMap((c) =>
      typeof c === 'object' && !Array.isArray(c) && c.tag === Fragment
        ? c.children ?? []
        : c
    )
    .filter(
      (c: XHTMLNode | string | boolean) =>
        c !== undefined && c !== null && c !== false
    );

  const o = {
    tag,
    attrs: attrs ?? {},
    children: sub,
  } satisfies XHTMLNode;

  return o;
}
