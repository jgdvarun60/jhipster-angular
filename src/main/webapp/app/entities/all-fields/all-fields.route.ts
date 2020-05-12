import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AllFields } from 'app/shared/model/all-fields.model';
import { AllFieldsService } from './all-fields.service';
import { AllFieldsComponent } from './all-fields.component';
import { AllFieldsDetailComponent } from './all-fields-detail.component';
import { AllFieldsUpdateComponent } from './all-fields-update.component';
import { AllFieldsDeletePopupComponent } from './all-fields-delete-dialog.component';
import { IAllFields } from 'app/shared/model/all-fields.model';

@Injectable({ providedIn: 'root' })
export class AllFieldsResolve implements Resolve<IAllFields> {
  constructor(private service: AllFieldsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAllFields> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AllFields>) => response.ok),
        map((allFields: HttpResponse<AllFields>) => allFields.body)
      );
    }
    return of(new AllFields());
  }
}

export const allFieldsRoute: Routes = [
  {
    path: '',
    component: AllFieldsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AllFields'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AllFieldsDetailComponent,
    resolve: {
      allFields: AllFieldsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AllFields'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AllFieldsUpdateComponent,
    resolve: {
      allFields: AllFieldsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AllFields'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AllFieldsUpdateComponent,
    resolve: {
      allFields: AllFieldsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AllFields'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const allFieldsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AllFieldsDeletePopupComponent,
    resolve: {
      allFields: AllFieldsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AllFields'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
