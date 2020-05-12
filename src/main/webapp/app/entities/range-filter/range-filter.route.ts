import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RangeFilter } from 'app/shared/model/range-filter.model';
import { RangeFilterService } from './range-filter.service';
import { RangeFilterComponent } from './range-filter.component';
import { RangeFilterDetailComponent } from './range-filter-detail.component';
import { RangeFilterUpdateComponent } from './range-filter-update.component';
import { RangeFilterDeletePopupComponent } from './range-filter-delete-dialog.component';
import { IRangeFilter } from 'app/shared/model/range-filter.model';

@Injectable({ providedIn: 'root' })
export class RangeFilterResolve implements Resolve<IRangeFilter> {
  constructor(private service: RangeFilterService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRangeFilter> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RangeFilter>) => response.ok),
        map((rangeFilter: HttpResponse<RangeFilter>) => rangeFilter.body)
      );
    }
    return of(new RangeFilter());
  }
}

export const rangeFilterRoute: Routes = [
  {
    path: '',
    component: RangeFilterComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RangeFilters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RangeFilterDetailComponent,
    resolve: {
      rangeFilter: RangeFilterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RangeFilters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RangeFilterUpdateComponent,
    resolve: {
      rangeFilter: RangeFilterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RangeFilters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RangeFilterUpdateComponent,
    resolve: {
      rangeFilter: RangeFilterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RangeFilters'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const rangeFilterPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RangeFilterDeletePopupComponent,
    resolve: {
      rangeFilter: RangeFilterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RangeFilters'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
