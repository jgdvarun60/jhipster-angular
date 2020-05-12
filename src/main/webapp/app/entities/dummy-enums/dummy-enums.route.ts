import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DummyEnums } from 'app/shared/model/dummy-enums.model';
import { DummyEnumsService } from './dummy-enums.service';
import { DummyEnumsComponent } from './dummy-enums.component';
import { DummyEnumsDetailComponent } from './dummy-enums-detail.component';
import { DummyEnumsUpdateComponent } from './dummy-enums-update.component';
import { DummyEnumsDeletePopupComponent } from './dummy-enums-delete-dialog.component';
import { IDummyEnums } from 'app/shared/model/dummy-enums.model';

@Injectable({ providedIn: 'root' })
export class DummyEnumsResolve implements Resolve<IDummyEnums> {
  constructor(private service: DummyEnumsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDummyEnums> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DummyEnums>) => response.ok),
        map((dummyEnums: HttpResponse<DummyEnums>) => dummyEnums.body)
      );
    }
    return of(new DummyEnums());
  }
}

export const dummyEnumsRoute: Routes = [
  {
    path: '',
    component: DummyEnumsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DummyEnums'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DummyEnumsDetailComponent,
    resolve: {
      dummyEnums: DummyEnumsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DummyEnums'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DummyEnumsUpdateComponent,
    resolve: {
      dummyEnums: DummyEnumsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DummyEnums'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DummyEnumsUpdateComponent,
    resolve: {
      dummyEnums: DummyEnumsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DummyEnums'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const dummyEnumsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DummyEnumsDeletePopupComponent,
    resolve: {
      dummyEnums: DummyEnumsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DummyEnums'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
