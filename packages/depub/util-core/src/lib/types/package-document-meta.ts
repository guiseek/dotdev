import { Author } from './author';

export interface PackageDocumentMeta {
  title: string;
  language: string;
  contributor: Author[];
  coverage: string;
  creator: Author;
  date: Date;
  description: string;
  format: string;
  publisher: string;
  relation: string;
  rights: string;
  source: string;
  subject: string;
  type: string;
  lastModified: Date;
}
