import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRangeFilter } from 'app/shared/model/range-filter.model';
import { AccountService } from 'app/core/auth/account.service';
import { RangeFilterService } from './range-filter.service';

@Component({
  selector: 'btgrp-range-filter',
  templateUrl: './range-filter.component.html'
})
export class RangeFilterComponent implements OnInit, OnDestroy {
  rangeFilters: IRangeFilter[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected rangeFilterService: RangeFilterService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.rangeFilterService
      .query()
      .pipe(
        filter((res: HttpResponse<IRangeFilter[]>) => res.ok),
        map((res: HttpResponse<IRangeFilter[]>) => res.body)
      )
      .subscribe(
        (res: IRangeFilter[]) => {
          this.rangeFilters = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRangeFilters();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRangeFilter) {
    return item.id;
  }

  registerChangeInRangeFilters() {
    this.eventSubscriber = this.eventManager.subscribe('rangeFilterListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
