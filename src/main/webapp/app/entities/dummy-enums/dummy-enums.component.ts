import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDummyEnums } from 'app/shared/model/dummy-enums.model';
import { AccountService } from 'app/core/auth/account.service';
import { DummyEnumsService } from './dummy-enums.service';

@Component({
  selector: 'btgrp-dummy-enums',
  templateUrl: './dummy-enums.component.html'
})
export class DummyEnumsComponent implements OnInit, OnDestroy {
  dummyEnums: IDummyEnums[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected dummyEnumsService: DummyEnumsService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.dummyEnumsService
      .query()
      .pipe(
        filter((res: HttpResponse<IDummyEnums[]>) => res.ok),
        map((res: HttpResponse<IDummyEnums[]>) => res.body)
      )
      .subscribe(
        (res: IDummyEnums[]) => {
          this.dummyEnums = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDummyEnums();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDummyEnums) {
    return item.id;
  }

  registerChangeInDummyEnums() {
    this.eventSubscriber = this.eventManager.subscribe('dummyEnumsListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
