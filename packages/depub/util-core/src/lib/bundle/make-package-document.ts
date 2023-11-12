import type { ManifestItem, ManifestItemRef, PackageDocument } from '../epub';
import { XMLBuilder } from 'fast-xml-parser';
import { BundleError } from './bundle-error';
import { toISO8601 } from '../utilities';

export function makePackageDocument(opf: PackageDocument): string {
  if (opf.version() !== '3.0') {
    throw new BundleError(`Unsupport EPUB spec ${opf.version()}`);
  }

  const builder = new XMLBuilder({
    format: true,
    ignoreAttributes: false,
    suppressUnpairedNode: false,
    unpairedTags: ['item', 'itemref'],
  });

  const optionalMetadata: Record<string, unknown> = {};
  const optionalList: Array<keyof ReturnType<typeof opf.metadata>> = [
    'contributor',
    'coverage',
    'format',
    'publisher',
    'relation',
    'rights',
    'source',
    'subject',
    'type',
  ];
  for (const key of optionalList) {
    const m = opf.metadata();
    if (m[key]) {
      optionalMetadata['dc:' + key] = m[key];
    }
  }
  const metadata = {
    '@_xmlns:dc': 'http://purl.org/dc/elements/1.1/',
    'dc:identifier': {
      '@_id': opf.uniqueIdentifier(),
      '#text': opf.identifier(),
    },
    'dc:title': opf.title(),
    'dc:language': opf.language(),
    'dc:creator': {
      '@_id': opf.creator().uid,
      '#text': opf.creator().name,
    },
    'dc:date': toISO8601(opf.metadata().date),
    'dc:description': opf.metadata().description,
    ...optionalMetadata,
    meta: [
      {
        '@_property': 'dcterms:modified',
        '#text': toISO8601(opf.metadata().lastModified),
      },
      {
        '@_refines': '#' + opf.creator().uid,
        '@_property': 'file-as',
        '#text': opf.creator()?.fileAs ?? opf.creator().name,
      },
    ],
  };

  function makeManifestItem(item: ManifestItem) {
    return {
      '@_fallback': item.fallback(),
      '@_href': item.href(),
      '@_id': item.id(),
      '@_media-overlay': item.mediaOverlay(),
      '@_media-type': item.mediaType(),
      '@_properties': item.properties(),
    };
  }

  function makeManifestItemRef(item: ManifestItemRef) {
    return {
      '@_idref': item.idref(),
    };
  }

  return builder.build({
    '?xml': { '#text': '', '@_version': '1.0', '@_encoding': 'UTF-8' },
    package: {
      '@_xmlns': 'http://www.idpf.org/2007/opf',
      '@_xmlns:epub': 'http://www.idpf.org/2007/ops',
      '@_unique-identifier': opf.uniqueIdentifier(),
      '@_version': opf.version(),
      metadata,
      manifest: {
        item: opf.manifest().map((i) => makeManifestItem(i)),
      },
      spine: {
        itemref: opf.spine().map((ir) => makeManifestItemRef(ir)),
      },
    },
  });
}
