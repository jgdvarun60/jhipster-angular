import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProTrackSharedModule } from 'app/shared/shared.module';
import { RangeFilterComponent } from './range-filter.component';
import { RangeFilterDetailComponent } from './range-filter-detail.component';
import { RangeFilterUpdateComponent } from './range-filter-update.component';
import { RangeFilterDeletePopupComponent, RangeFilterDeleteDialogComponent } from './range-filter-delete-dialog.component';
import { rangeFilterRoute, rangeFilterPopupRoute } from './range-filter.route';

const ENTITY_STATES = [...rangeFilterRoute, ...rangeFilterPopupRoute];

@NgModule({
  imports: [ProTrackSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RangeFilterComponent,
    RangeFilterDetailComponent,
    RangeFilterUpdateComponent,
    RangeFilterDeleteDialogComponent,
    RangeFilterDeletePopupComponent
  ],
  entryComponents: [RangeFilterDeleteDialogComponent]
})
export class ProTrackRangeFilterModule {}
