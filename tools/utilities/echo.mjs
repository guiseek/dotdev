import { writeFileSync } from 'node:fs';

export const echo = (file) => (value) => {
  const data = typeof value === 'string' ? value : JSON.stringify(value);
  return writeFileSync(file, data, { encoding: 'utf8' });
};
