import { ImageMediaType } from '../types';
import { extname } from 'node:path';
import {
  ImageGif,
  ImageJpeg,
  ImagePng,
  ImageSvg,
  ImageWebp,
} from '../constants';

export function getImageMediaType(file: string): ImageMediaType | void {
  const ext = extname(file);
  switch (ext) {
    case '.gif':
      return ImageGif;
    case '.jpg':
    case '.jpeg':
      return ImageJpeg;
    case '.png':
      return ImagePng;
    case '.svg':
      return ImageSvg;
    case '.webp':
      return ImageWebp;
    default:
      return;
  }
}
