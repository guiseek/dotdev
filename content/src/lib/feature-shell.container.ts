import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'dev-feature-shell',
  imports: [RouterOutlet, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <a routerLink="/">
        <img src="assets/book-green.svg" alt="">
      </a>
    </header>
    <main>
      <router-outlet />
    </main>
  `,
  styles: [`:host {display: block;}`],
})
export class FeatureShellContainer {

}
