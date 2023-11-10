import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'dev-root',
  template: `<h1>Welcome content</h1>
    <router-outlet></router-outlet>`,
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
