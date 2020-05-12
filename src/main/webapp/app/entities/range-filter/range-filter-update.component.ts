import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRangeFilter, RangeFilter } from 'app/shared/model/range-filter.model';
import { RangeFilterService } from './range-filter.service';
import { IDummy } from 'app/shared/model/dummy.model';
import { DummyService } from 'app/entities/dummy/dummy.service';

@Component({
  selector: 'btgrp-range-filter-update',
  templateUrl: './range-filter-update.component.html'
})
export class RangeFilterUpdateComponent implements OnInit {
  isSaving: boolean;

  dummies: IDummy[];

  editForm = this.fb.group({
    id: [],
    title: [],
    expression: [],
    hide: [],
    equals: [],
    greaterThan: [],
    greaterThanOrEqual: [],
    inArr: [],
    lessThan: [],
    lessThanOrEqual: [],
    specified: [],
    inLists: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected rangeFilterService: RangeFilterService,
    protected dummyService: DummyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rangeFilter }) => {
      this.updateForm(rangeFilter);
    });
    this.dummyService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDummy[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDummy[]>) => response.body)
      )
      .subscribe((res: IDummy[]) => (this.dummies = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(rangeFilter: IRangeFilter) {
    this.editForm.patchValue({
      id: rangeFilter.id,
      title: rangeFilter.title,
      expression: rangeFilter.expression,
      hide: rangeFilter.hide,
      equals: rangeFilter.equals,
      greaterThan: rangeFilter.greaterThan,
      greaterThanOrEqual: rangeFilter.greaterThanOrEqual,
      inArr: rangeFilter.inArr,
      lessThan: rangeFilter.lessThan,
      lessThanOrEqual: rangeFilter.lessThanOrEqual,
      specified: rangeFilter.specified,
      inLists: rangeFilter.inLists
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rangeFilter = this.createFromForm();
    if (rangeFilter.id !== undefined) {
      this.subscribeToSaveResponse(this.rangeFilterService.update(rangeFilter));
    } else {
      this.subscribeToSaveResponse(this.rangeFilterService.create(rangeFilter));
    }
  }

  private createFromForm(): IRangeFilter {
    return {
      ...new RangeFilter(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      expression: this.editForm.get(['expression']).value,
      hide: this.editForm.get(['hide']).value,
      equals: this.editForm.get(['equals']).value,
      greaterThan: this.editForm.get(['greaterThan']).value,
      greaterThanOrEqual: this.editForm.get(['greaterThanOrEqual']).value,
      inArr: this.editForm.get(['inArr']).value,
      lessThan: this.editForm.get(['lessThan']).value,
      lessThanOrEqual: this.editForm.get(['lessThanOrEqual']).value,
      specified: this.editForm.get(['specified']).value,
      inLists: this.editForm.get(['inLists']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRangeFilter>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackDummyById(index: number, item: IDummy) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
