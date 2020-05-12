import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProTrackSharedModule } from 'app/shared/shared.module';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

import { adminState } from './admin.route';
import { AuditsComponent } from './audits/audits.component';
import { LogsComponent } from './logs/logs.component';
import { BtgrpMetricsMonitoringComponent } from './metrics/metrics.component';
import { BtgrpHealthModalComponent } from './health/health-modal.component';
import { BtgrpHealthCheckComponent } from './health/health.component';
import { BtgrpConfigurationComponent } from './configuration/configuration.component';
import { BtgrpDocsComponent } from './docs/docs.component';

@NgModule({
  imports: [
    ProTrackSharedModule,
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    RouterModule.forChild(adminState)
  ],
  declarations: [
    AuditsComponent,
    LogsComponent,
    BtgrpConfigurationComponent,
    BtgrpHealthCheckComponent,
    BtgrpHealthModalComponent,
    BtgrpDocsComponent,
    BtgrpMetricsMonitoringComponent
  ],
  entryComponents: [BtgrpHealthModalComponent]
})
export class ProTrackAdminModule {}
