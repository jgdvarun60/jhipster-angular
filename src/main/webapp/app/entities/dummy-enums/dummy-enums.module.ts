import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProTrackSharedModule } from 'app/shared/shared.module';
import { DummyEnumsComponent } from './dummy-enums.component';
import { DummyEnumsDetailComponent } from './dummy-enums-detail.component';
import { DummyEnumsUpdateComponent } from './dummy-enums-update.component';
import { DummyEnumsDeletePopupComponent, DummyEnumsDeleteDialogComponent } from './dummy-enums-delete-dialog.component';
import { dummyEnumsRoute, dummyEnumsPopupRoute } from './dummy-enums.route';

const ENTITY_STATES = [...dummyEnumsRoute, ...dummyEnumsPopupRoute];

@NgModule({
  imports: [ProTrackSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DummyEnumsComponent,
    DummyEnumsDetailComponent,
    DummyEnumsUpdateComponent,
    DummyEnumsDeleteDialogComponent,
    DummyEnumsDeletePopupComponent
  ],
  entryComponents: [DummyEnumsDeleteDialogComponent]
})
export class ProTrackDummyEnumsModule {}
