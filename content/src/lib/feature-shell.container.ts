import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'dev-feature-shell',
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<main> <router-outlet /> </main>`,
  styles: [`:host {display: block;}`],
})
export class FeatureShellContainer {
}
