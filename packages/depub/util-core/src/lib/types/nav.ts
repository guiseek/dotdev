import type { Prettify } from './prettify';
import type { HTML } from '../epub/html';
import { XHTML } from '../epub/xhtml';

export type NavItem = { title: string; attrs?: Record<string, string> };

export type NavLink = Prettify<NavItem & { page: HTML | XHTML }>;

export type NavSubList = Prettify<NavItem & { list: NavLink[] }>;

export type NavList = Array<NavLink | NavSubList>;

export interface NavOption<T> {
  title: string;
  heading: 1 | 2 | 3 | 4 | 5 | 6;
  titleAttrs: Record<string, string>;
  builder?: T;
}
