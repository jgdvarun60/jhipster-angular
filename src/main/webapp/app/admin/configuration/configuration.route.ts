import { Route } from '@angular/router';

import { BtgrpConfigurationComponent } from './configuration.component';

export const configurationRoute: Route = {
  path: 'configuration',
  component: BtgrpConfigurationComponent,
  data: {
    pageTitle: 'Configuration'
  }
};
