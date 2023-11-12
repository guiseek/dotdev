import { ContentService } from './data-access/services/content';
import { HttpClient } from '@angular/common/http';

export function provideContent() {
  return [
    {
      provide: ContentService,
      deps: [HttpClient],
    }
  ];
}
