import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Dummy } from 'app/shared/model/dummy.model';
import { DummyService } from './dummy.service';
import { DummyComponent } from './dummy.component';
import { DummyDetailComponent } from './dummy-detail.component';
import { DummyUpdateComponent } from './dummy-update.component';
import { DummyDeletePopupComponent } from './dummy-delete-dialog.component';
import { IDummy } from 'app/shared/model/dummy.model';

@Injectable({ providedIn: 'root' })
export class DummyResolve implements Resolve<IDummy> {
  constructor(private service: DummyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDummy> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Dummy>) => response.ok),
        map((dummy: HttpResponse<Dummy>) => dummy.body)
      );
    }
    return of(new Dummy());
  }
}

export const dummyRoute: Routes = [
  {
    path: '',
    component: DummyComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dummies'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DummyDetailComponent,
    resolve: {
      dummy: DummyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dummies'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DummyUpdateComponent,
    resolve: {
      dummy: DummyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dummies'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DummyUpdateComponent,
    resolve: {
      dummy: DummyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dummies'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const dummyPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DummyDeletePopupComponent,
    resolve: {
      dummy: DummyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dummies'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
