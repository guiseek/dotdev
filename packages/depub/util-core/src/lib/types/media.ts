import { TextCSS, TextXHTML } from '../constants/text';
import { ImageMediaType } from './image';

export type MediaType = ImageMediaType | typeof TextCSS | typeof TextXHTML;
