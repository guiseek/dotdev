import { MarkdownMeta, ContentService, contentMap } from '../../data-access';
import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { map, take } from 'rxjs';

type Meta = Partial<MarkdownMeta> | null;
type Content = string | null;

@Component({
  standalone: true,
  selector: 'dev-content',
  templateUrl: './content.container.html',
  imports: [CommonModule, RouterModule],
})
export class ContentContainer {
  #service = inject(ContentService);

  #meta = signal<Meta>(null);
  get meta() {
    return this.#meta();
  }

  #content = signal<Content>(null);
  get content() {
    return this.#content();
  }

  @Input()
  set content(id) {
    if (id) {
      this.#service
        .getMarkdown(id)
        .pipe(take(1), map(contentMap))
        .subscribe(({ meta, content }) => {
          this.#meta.set(meta);
          this.#content.set(content);
        });
    }
  }
}
