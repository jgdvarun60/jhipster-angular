import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAllFields } from 'app/shared/model/all-fields.model';
import { AccountService } from 'app/core/auth/account.service';
import { AllFieldsService } from './all-fields.service';

@Component({
  selector: 'btgrp-all-fields',
  templateUrl: './all-fields.component.html'
})
export class AllFieldsComponent implements OnInit, OnDestroy {
  allFields: IAllFields[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected allFieldsService: AllFieldsService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.allFieldsService
      .query()
      .pipe(
        filter((res: HttpResponse<IAllFields[]>) => res.ok),
        map((res: HttpResponse<IAllFields[]>) => res.body)
      )
      .subscribe(
        (res: IAllFields[]) => {
          this.allFields = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAllFields();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAllFields) {
    return item.id;
  }

  registerChangeInAllFields() {
    this.eventSubscriber = this.eventManager.subscribe('allFieldsListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
