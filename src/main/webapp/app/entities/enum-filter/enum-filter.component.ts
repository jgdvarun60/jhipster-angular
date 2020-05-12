import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEnumFilter } from 'app/shared/model/enum-filter.model';
import { AccountService } from 'app/core/auth/account.service';
import { EnumFilterService } from './enum-filter.service';

@Component({
  selector: 'btgrp-enum-filter',
  templateUrl: './enum-filter.component.html'
})
export class EnumFilterComponent implements OnInit, OnDestroy {
  enumFilters: IEnumFilter[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected enumFilterService: EnumFilterService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.enumFilterService
      .query()
      .pipe(
        filter((res: HttpResponse<IEnumFilter[]>) => res.ok),
        map((res: HttpResponse<IEnumFilter[]>) => res.body)
      )
      .subscribe(
        (res: IEnumFilter[]) => {
          this.enumFilters = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEnumFilters();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEnumFilter) {
    return item.id;
  }

  registerChangeInEnumFilters() {
    this.eventSubscriber = this.eventManager.subscribe('enumFilterListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
