import { Route } from '@angular/router';

import { BtgrpHealthCheckComponent } from './health.component';

export const healthRoute: Route = {
  path: 'health',
  component: BtgrpHealthCheckComponent,
  data: {
    pageTitle: 'Health Checks'
  }
};
