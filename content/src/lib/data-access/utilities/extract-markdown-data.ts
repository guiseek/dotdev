import { extractMarkdownMeta } from './extract-markdown-meta';

export const extractMarkdownData = (value: string) => {
  const splitIndex = value.indexOf('\n---');
  return {
    meta: extractMarkdownMeta(value),
    content: value.slice(splitIndex),
  };
};
