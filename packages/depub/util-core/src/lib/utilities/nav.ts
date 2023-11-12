import type { NavLink, NavSubList, XHTMLNode } from '../types';
import { h } from './h';

export const navList = (items: Array<NavLink | NavSubList>): XHTMLNode => {
  return h('ol', {}, items.map(navItem));
};

export const navItem = (item: NavLink | NavSubList) => {
  const elements: XHTMLNode[] = [];

  if ('page' in item) {
    elements.push(h('a', { href: item.page.filename() }, item.title));
  }

  if ('list' in item) {
    const span = h('span', {}, item.title);
    elements.push(span, navList(item.list));
  }

  return h('li', item.attrs, elements);
};
