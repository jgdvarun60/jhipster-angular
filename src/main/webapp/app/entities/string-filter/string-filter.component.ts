import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStringFilter } from 'app/shared/model/string-filter.model';
import { AccountService } from 'app/core/auth/account.service';
import { StringFilterService } from './string-filter.service';

@Component({
  selector: 'btgrp-string-filter',
  templateUrl: './string-filter.component.html'
})
export class StringFilterComponent implements OnInit, OnDestroy {
  stringFilters: IStringFilter[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected stringFilterService: StringFilterService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.stringFilterService
      .query()
      .pipe(
        filter((res: HttpResponse<IStringFilter[]>) => res.ok),
        map((res: HttpResponse<IStringFilter[]>) => res.body)
      )
      .subscribe(
        (res: IStringFilter[]) => {
          this.stringFilters = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInStringFilters();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStringFilter) {
    return item.id;
  }

  registerChangeInStringFilters() {
    this.eventSubscriber = this.eventManager.subscribe('stringFilterListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
