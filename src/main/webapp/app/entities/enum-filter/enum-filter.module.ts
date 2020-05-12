import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProTrackSharedModule } from 'app/shared/shared.module';
import { EnumFilterComponent } from './enum-filter.component';
import { EnumFilterDetailComponent } from './enum-filter-detail.component';
import { EnumFilterUpdateComponent } from './enum-filter-update.component';
import { EnumFilterDeletePopupComponent, EnumFilterDeleteDialogComponent } from './enum-filter-delete-dialog.component';
import { enumFilterRoute, enumFilterPopupRoute } from './enum-filter.route';

const ENTITY_STATES = [...enumFilterRoute, ...enumFilterPopupRoute];

@NgModule({
  imports: [ProTrackSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EnumFilterComponent,
    EnumFilterDetailComponent,
    EnumFilterUpdateComponent,
    EnumFilterDeleteDialogComponent,
    EnumFilterDeletePopupComponent
  ],
  entryComponents: [EnumFilterDeleteDialogComponent]
})
export class ProTrackEnumFilterModule {}
