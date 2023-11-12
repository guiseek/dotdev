import { AssetsContainer } from './containers/assets/assets.container';
import { ContentContainer } from './containers/content/content.container';
import { FeatureShellContainer } from './feature-shell.container';
import { provideContent } from './feature-shell.config';
import { Route } from '@angular/router';

export const featureShellRoutes: Route[] = [
  {
    path: '',
    component: FeatureShellContainer,
    providers: provideContent(),
    children: [
      {
        path: ':content',
        component: ContentContainer,
      },
      {
        path: '',
        component: AssetsContainer,
      },
    ],
  },
];
