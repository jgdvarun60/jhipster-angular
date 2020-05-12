import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IEnumFilter, EnumFilter } from 'app/shared/model/enum-filter.model';
import { EnumFilterService } from './enum-filter.service';
import { IDummyEnums } from 'app/shared/model/dummy-enums.model';
import { DummyEnumsService } from 'app/entities/dummy-enums/dummy-enums.service';

@Component({
  selector: 'btgrp-enum-filter-update',
  templateUrl: './enum-filter-update.component.html'
})
export class EnumFilterUpdateComponent implements OnInit {
  isSaving: boolean;

  dummyenums: IDummyEnums[];

  editForm = this.fb.group({
    id: [],
    title: [],
    expression: [],
    hide: [],
    equals: [],
    inArr: [],
    specified: [],
    inlists: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected enumFilterService: EnumFilterService,
    protected dummyEnumsService: DummyEnumsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ enumFilter }) => {
      this.updateForm(enumFilter);
    });
    this.dummyEnumsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDummyEnums[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDummyEnums[]>) => response.body)
      )
      .subscribe((res: IDummyEnums[]) => (this.dummyenums = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(enumFilter: IEnumFilter) {
    this.editForm.patchValue({
      id: enumFilter.id,
      title: enumFilter.title,
      expression: enumFilter.expression,
      hide: enumFilter.hide,
      equals: enumFilter.equals,
      inArr: enumFilter.inArr,
      specified: enumFilter.specified,
      inlists: enumFilter.inlists
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const enumFilter = this.createFromForm();
    if (enumFilter.id !== undefined) {
      this.subscribeToSaveResponse(this.enumFilterService.update(enumFilter));
    } else {
      this.subscribeToSaveResponse(this.enumFilterService.create(enumFilter));
    }
  }

  private createFromForm(): IEnumFilter {
    return {
      ...new EnumFilter(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      expression: this.editForm.get(['expression']).value,
      hide: this.editForm.get(['hide']).value,
      equals: this.editForm.get(['equals']).value,
      inArr: this.editForm.get(['inArr']).value,
      specified: this.editForm.get(['specified']).value,
      inlists: this.editForm.get(['inlists']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEnumFilter>>) {
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

  trackDummyEnumsById(index: number, item: IDummyEnums) {
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
