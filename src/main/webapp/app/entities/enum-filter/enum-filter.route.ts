import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EnumFilter } from 'app/shared/model/enum-filter.model';
import { EnumFilterService } from './enum-filter.service';
import { EnumFilterComponent } from './enum-filter.component';
import { EnumFilterDetailComponent } from './enum-filter-detail.component';
import { EnumFilterUpdateComponent } from './enum-filter-update.component';
import { EnumFilterDeletePopupComponent } from './enum-filter-delete-dialog.component';
import { IEnumFilter } from 'app/shared/model/enum-filter.model';

@Injectable({ providedIn: 'root' })
export class EnumFilterResolve implements Resolve<IEnumFilter> {
  constructor(private service: EnumFilterService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEnumFilter> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EnumFilter>) => response.ok),
        map((enumFilter: HttpResponse<EnumFilter>) => enumFilter.body)
      );
    }
    return of(new EnumFilter());
  }
}

export const enumFilterRoute: Routes = [
  {
    path: '',
    component: EnumFilterComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EnumFilters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EnumFilterDetailComponent,
    resolve: {
      enumFilter: EnumFilterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EnumFilters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EnumFilterUpdateComponent,
    resolve: {
      enumFilter: EnumFilterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EnumFilters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EnumFilterUpdateComponent,
    resolve: {
      enumFilter: EnumFilterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EnumFilters'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const enumFilterPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EnumFilterDeletePopupComponent,
    resolve: {
      enumFilter: EnumFilterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EnumFilters'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
