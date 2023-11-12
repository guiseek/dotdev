import { base } from './base.mjs';

export const extract = (value) => {
  const charactersBetweenGroupedHyphens = /^---([\s\S]*?)---/;
  const [, metadata] = value.match(charactersBetweenGroupedHyphens) ?? [];

  if (!metadata) return {};

  const metadataLines = metadata.split('\n');
  const metadataValue = metadataLines.reduce((accumulator, line) => {
    const [key, ...values] = line.split(':').map((part) => part.trim());
    // prettier-ignore
    const value = values.join('').split(';').map((part) => part.trim())
    if (key) accumulator[key] = value[1] ? value : value.join('');
    return accumulator;
  }, base());

  return metadataValue;
};
