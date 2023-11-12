import { XMLBuilder } from 'fast-xml-parser';
import type { Epub } from '../epub';

/**
 * Generate META-INF/container.xml
 *
 * See: https://www.w3.org/TR/epub-33/#sec-container-metainf-container.xml
 *
 * Example: https://www.w3.org/TR/epub-33/#sec-container-container.xml-example
 */
export function makeContainer(epub: Epub) {
  const builder = new XMLBuilder({
    format: true,
    ignoreAttributes: false,
    suppressUnpairedNode: false,
    unpairedTags: ['rootfile'],
  });

  const rootfile = epub.packages().map((p) => ({
    '@_full-path': p.filename(),
    '@_media-type': 'application/oebps-package+xml',
    '#text': '',
  }));

  return builder.build({
    '?xml': { '#text': '', '@_version': '1.0', '@_encoding': 'UTF-8' },
    container: {
      '@_version': '1.0',
      '@_xmlns': 'urn:oasis:names:tc:opendocument:xmlns:container',
      rootfiles: [
        {
          rootfile,
        },
      ],
    },
  });
}
