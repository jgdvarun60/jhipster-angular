import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IStringFilter, StringFilter } from 'app/shared/model/string-filter.model';
import { StringFilterService } from './string-filter.service';
import { IDummy } from 'app/shared/model/dummy.model';
import { DummyService } from 'app/entities/dummy/dummy.service';

@Component({
  selector: 'btgrp-string-filter-update',
  templateUrl: './string-filter-update.component.html'
})
export class StringFilterUpdateComponent implements OnInit {
  isSaving: boolean;

  dummies: IDummy[];

  editForm = this.fb.group({
    id: [],
    title: [],
    expression: [],
    hide: [],
    contains: [],
    equals: [],
    inArr: [],
    specified: [],
    inlists: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected stringFilterService: StringFilterService,
    protected dummyService: DummyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ stringFilter }) => {
      this.updateForm(stringFilter);
    });
    this.dummyService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDummy[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDummy[]>) => response.body)
      )
      .subscribe((res: IDummy[]) => (this.dummies = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(stringFilter: IStringFilter) {
    this.editForm.patchValue({
      id: stringFilter.id,
      title: stringFilter.title,
      expression: stringFilter.expression,
      hide: stringFilter.hide,
      contains: stringFilter.contains,
      equals: stringFilter.equals,
      inArr: stringFilter.inArr,
      specified: stringFilter.specified,
      inlists: stringFilter.inlists
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const stringFilter = this.createFromForm();
    if (stringFilter.id !== undefined) {
      this.subscribeToSaveResponse(this.stringFilterService.update(stringFilter));
    } else {
      this.subscribeToSaveResponse(this.stringFilterService.create(stringFilter));
    }
  }

  private createFromForm(): IStringFilter {
    return {
      ...new StringFilter(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      expression: this.editForm.get(['expression']).value,
      hide: this.editForm.get(['hide']).value,
      contains: this.editForm.get(['contains']).value,
      equals: this.editForm.get(['equals']).value,
      inArr: this.editForm.get(['inArr']).value,
      specified: this.editForm.get(['specified']).value,
      inlists: this.editForm.get(['inlists']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStringFilter>>) {
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
