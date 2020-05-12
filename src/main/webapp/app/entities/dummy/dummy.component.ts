import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDummy } from 'app/shared/model/dummy.model';
import { AccountService } from 'app/core/auth/account.service';
import { DummyService } from './dummy.service';

@Component({
  selector: 'btgrp-dummy',
  templateUrl: './dummy.component.html'
})
export class DummyComponent implements OnInit, OnDestroy {
  dummies: IDummy[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected dummyService: DummyService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.dummyService
      .query()
      .pipe(
        filter((res: HttpResponse<IDummy[]>) => res.ok),
        map((res: HttpResponse<IDummy[]>) => res.body)
      )
      .subscribe(
        (res: IDummy[]) => {
          this.dummies = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDummies();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDummy) {
    return item.id;
  }

  registerChangeInDummies() {
    this.eventSubscriber = this.eventManager.subscribe('dummyListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
