import { Route } from '@angular/router';

import { BtgrpMetricsMonitoringComponent } from './metrics.component';

export const metricsRoute: Route = {
  path: 'metrics',
  component: BtgrpMetricsMonitoringComponent,
  data: {
    pageTitle: 'Application Metrics'
  }
};
