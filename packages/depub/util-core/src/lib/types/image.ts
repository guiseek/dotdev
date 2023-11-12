import {
  ImageGif,
  ImageJpeg,
  ImagePng,
  ImageSvg,
  ImageWebp,
} from '../constants/image';

export type ImageMediaType =
  | typeof ImageGif
  | typeof ImageJpeg
  | typeof ImagePng
  | typeof ImageSvg
  | typeof ImageWebp;

export type ImageExtension = 'gif' | 'jpg' | 'jpeg' | 'png' | 'svg' | 'webp';
