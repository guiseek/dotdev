import { AsyncZipOptions, AsyncZippable, strToU8, zip } from 'fflate';
import { makePackageDocument } from './make-package-document';
import { makeContainer } from './make-container';
import { dirname, join } from 'pathe';
import { MIMETYPE } from '../constants';
import type { Epub } from '../epub';

/**
 * Bundle epub to zip archive
 */
export async function bundle(epub: Epub): Promise<Uint8Array> {
  const opfs = epub
    .packages()
    .map((opf) => [opf.filename(), strToU8(makePackageDocument(opf))] as const);

  const items: Record<string, Uint8Array> = {};
  for (const opf of epub.packages()) {
    const base = dirname(opf.filename());
    for (const item of opf.items()) {
      const name = join(base, item.filename());
      if (name in items) {
        continue;
      }
      /**
       * @todo parallel here
       */
      items[name] = await item.bundle();
    }
  }

  const abstractContainer: AsyncZippable = {
    mimetype: strToU8(MIMETYPE),
    'META-INF': {
      'container.xml': strToU8(makeContainer(epub)),
    },
    ...Object.fromEntries(opfs),
    ...items,
  };

  const asyncZipOptions: AsyncZipOptions = { level: 0, mtime: new Date() };

  return new Promise((res, rej) => {
    zip(abstractContainer, asyncZipOptions, (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });
}
