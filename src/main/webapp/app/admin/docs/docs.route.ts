import { Route } from '@angular/router';

import { BtgrpDocsComponent } from './docs.component';

export const docsRoute: Route = {
  path: 'docs',
  component: BtgrpDocsComponent,
  data: {
    pageTitle: 'API'
  }
};
