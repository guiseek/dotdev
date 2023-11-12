import { ContentAsset } from '../interfaces/content-asset';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class ContentService {
  #http = inject(HttpClient);

  getMarkdown(file: string) {
    return this.#http.get(`/assets/content/${file}`, { responseType: 'text' });
  }

  getContentJson() {
    return this.#http.get<ContentAsset[]>(`/assets/content.json`);
  }
}
