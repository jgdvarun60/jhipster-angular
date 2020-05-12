import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProTrackSharedModule } from 'app/shared/shared.module';
import { AllFieldsComponent } from './all-fields.component';
import { AllFieldsDetailComponent } from './all-fields-detail.component';
import { AllFieldsUpdateComponent } from './all-fields-update.component';
import { AllFieldsDeletePopupComponent, AllFieldsDeleteDialogComponent } from './all-fields-delete-dialog.component';
import { allFieldsRoute, allFieldsPopupRoute } from './all-fields.route';

const ENTITY_STATES = [...allFieldsRoute, ...allFieldsPopupRoute];

@NgModule({
  imports: [ProTrackSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AllFieldsComponent,
    AllFieldsDetailComponent,
    AllFieldsUpdateComponent,
    AllFieldsDeleteDialogComponent,
    AllFieldsDeletePopupComponent
  ],
  entryComponents: [AllFieldsDeleteDialogComponent]
})
export class ProTrackAllFieldsModule {}
