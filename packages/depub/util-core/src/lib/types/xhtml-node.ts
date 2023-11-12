export interface XHTMLNode {
  tag: string;
  attrs?: Record<string, string>;
  children?: Array<string | XHTMLNode>;
}
