import { readdirSync } from 'node:fs';
import { join } from 'node:path';

export const ls = (path = '', withPath = true) => {
  const files = readdirSync(path, { encoding: 'utf8' });
  return withPath ? files.map((file) => join(path, file)) : files;
};
