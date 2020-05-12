import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProTrackSharedModule } from 'app/shared/shared.module';
import { DummyComponent } from './dummy.component';
import { DummyDetailComponent } from './dummy-detail.component';
import { DummyUpdateComponent } from './dummy-update.component';
import { DummyDeletePopupComponent, DummyDeleteDialogComponent } from './dummy-delete-dialog.component';
import { dummyRoute, dummyPopupRoute } from './dummy.route';

const ENTITY_STATES = [...dummyRoute, ...dummyPopupRoute];

@NgModule({
  imports: [ProTrackSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [DummyComponent, DummyDetailComponent, DummyUpdateComponent, DummyDeleteDialogComponent, DummyDeletePopupComponent],
  entryComponents: [DummyDeleteDialogComponent]
})
export class ProTrackDummyModule {}
