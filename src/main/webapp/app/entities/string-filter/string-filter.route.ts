import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StringFilter } from 'app/shared/model/string-filter.model';
import { StringFilterService } from './string-filter.service';
import { StringFilterComponent } from './string-filter.component';
import { StringFilterDetailComponent } from './string-filter-detail.component';
import { StringFilterUpdateComponent } from './string-filter-update.component';
import { StringFilterDeletePopupComponent } from './string-filter-delete-dialog.component';
import { IStringFilter } from 'app/shared/model/string-filter.model';

@Injectable({ providedIn: 'root' })
export class StringFilterResolve implements Resolve<IStringFilter> {
  constructor(private service: StringFilterService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStringFilter> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<StringFilter>) => response.ok),
        map((stringFilter: HttpResponse<StringFilter>) => stringFilter.body)
      );
    }
    return of(new StringFilter());
  }
}

export const stringFilterRoute: Routes = [
  {
    path: '',
    component: StringFilterComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StringFilters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StringFilterDetailComponent,
    resolve: {
      stringFilter: StringFilterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StringFilters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StringFilterUpdateComponent,
    resolve: {
      stringFilter: StringFilterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StringFilters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StringFilterUpdateComponent,
    resolve: {
      stringFilter: StringFilterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StringFilters'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const stringFilterPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: StringFilterDeletePopupComponent,
    resolve: {
      stringFilter: StringFilterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StringFilters'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
