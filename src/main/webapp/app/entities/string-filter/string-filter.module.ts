import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProTrackSharedModule } from 'app/shared/shared.module';
import { StringFilterComponent } from './string-filter.component';
import { StringFilterDetailComponent } from './string-filter-detail.component';
import { StringFilterUpdateComponent } from './string-filter-update.component';
import { StringFilterDeletePopupComponent, StringFilterDeleteDialogComponent } from './string-filter-delete-dialog.component';
import { stringFilterRoute, stringFilterPopupRoute } from './string-filter.route';

const ENTITY_STATES = [...stringFilterRoute, ...stringFilterPopupRoute];

@NgModule({
  imports: [ProTrackSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    StringFilterComponent,
    StringFilterDetailComponent,
    StringFilterUpdateComponent,
    StringFilterDeleteDialogComponent,
    StringFilterDeletePopupComponent
  ],
  entryComponents: [StringFilterDeleteDialogComponent]
})
export class ProTrackStringFilterModule {}
