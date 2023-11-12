import { extractMarkdownData } from '../utilities/extract-markdown-data';
import { parse } from 'marked';

export const contentMap = (value: string) => {
  const { meta, content } = extractMarkdownData(value);
  return { meta, content: parse(content) };
};
