import { readFileSync } from 'node:fs';

export const cat = (path) => {
  return readFileSync(path, { encoding: 'utf8' }).toString();
};
