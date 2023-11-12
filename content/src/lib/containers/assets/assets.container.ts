import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService, assetMap } from '../../data-access';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map, take } from 'rxjs';

@Component({
  standalone: true,
  selector: 'dev-assets',
  imports: [AsyncPipe, NgFor, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './assets.container.html',
})
export class AssetsContainer {
  routes$ = inject(ContentService)
    .getContentJson()
    .pipe(map(assetMap), take(1));
}
