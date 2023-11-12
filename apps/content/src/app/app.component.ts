import { RouterLink, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
  ],
  selector: 'dev-root',
  template: `<router-outlet></router-outlet>`,
  styles: [
    `
      :host {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class AppComponent {}
