import { PageTemplate } from './page-template';
import { NavList, NavOption } from './nav';
import { XHTMLBuilder } from '../builder';
import { Prettify } from './prettify';
import { Image } from '../epub';

export interface Theme<
  P extends Record<string, PageTemplate> | object = Record<string, PageTemplate>
> {
  name: string;

  styles: string[];

  images: string[];

  pages: Prettify<
    {
      cover(
        file: string,
        props: { image: Image; title?: string }
      ): XHTMLBuilder;
      nav(
        file: string,
        props: { nav: NavList; option: Partial<NavOption<XHTMLBuilder>> }
      ): XHTMLBuilder;
    } & P
  >;
}
