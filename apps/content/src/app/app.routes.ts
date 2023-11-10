import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@dev/feature-shell').then((m) => m.featureShellRoutes),
  },
];
