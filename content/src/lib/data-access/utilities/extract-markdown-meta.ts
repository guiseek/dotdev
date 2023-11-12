import { getMarkdownMetaBase } from './get-markdown-meta-base';
import { MarkdownMeta } from '../interfaces/markdown-meta';

export const extractMarkdownMeta = <R extends MarkdownMeta>(value: string) => {
  const charactersBetweenGroupedHyphens = /^---([\s\S]*?)---/;
  const [, metadata] = value.match(charactersBetweenGroupedHyphens) ?? [];

  if (!metadata) return {} as Partial<R>;

  const metadataLines = metadata.split('\n');
  const metadataValue: object = metadataLines.reduce((accumulator, line) => {
    const [key, ...values] = line.split(':').map((part) => part.trim());
    // prettier-ignore
    const value = values.join('').split(';').map((part) => part.trim())
    if (key) accumulator[key] = value[1] ? value : value.join('');
    return accumulator;
  }, getMarkdownMetaBase());

  return metadataValue as R;
};
