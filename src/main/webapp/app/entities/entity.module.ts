import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'all-fields',
        loadChildren: () => import('./all-fields/all-fields.module').then(m => m.ProTrackAllFieldsModule)
      },
      {
        path: 'dummy',
        loadChildren: () => import('./dummy/dummy.module').then(m => m.ProTrackDummyModule)
      },
      {
        path: 'dummy-enums',
        loadChildren: () => import('./dummy-enums/dummy-enums.module').then(m => m.ProTrackDummyEnumsModule)
      },
      {
        path: 'range-filter',
        loadChildren: () => import('./range-filter/range-filter.module').then(m => m.ProTrackRangeFilterModule)
      },
      {
        path: 'string-filter',
        loadChildren: () => import('./string-filter/string-filter.module').then(m => m.ProTrackStringFilterModule)
      },
      {
        path: 'enum-filter',
        loadChildren: () => import('./enum-filter/enum-filter.module').then(m => m.ProTrackEnumFilterModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ProTrackEntityModule {}
