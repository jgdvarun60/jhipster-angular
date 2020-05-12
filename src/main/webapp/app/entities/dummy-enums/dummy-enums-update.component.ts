import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IDummyEnums, DummyEnums } from 'app/shared/model/dummy-enums.model';
import { DummyEnumsService } from './dummy-enums.service';

@Component({
  selector: 'btgrp-dummy-enums-update',
  templateUrl: './dummy-enums-update.component.html'
})
export class DummyEnumsUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    dummy: []
  });

  constructor(protected dummyEnumsService: DummyEnumsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ dummyEnums }) => {
      this.updateForm(dummyEnums);
    });
  }

  updateForm(dummyEnums: IDummyEnums) {
    this.editForm.patchValue({
      id: dummyEnums.id,
      dummy: dummyEnums.dummy
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const dummyEnums = this.createFromForm();
    if (dummyEnums.id !== undefined) {
      this.subscribeToSaveResponse(this.dummyEnumsService.update(dummyEnums));
    } else {
      this.subscribeToSaveResponse(this.dummyEnumsService.create(dummyEnums));
    }
  }

  private createFromForm(): IDummyEnums {
    return {
      ...new DummyEnums(),
      id: this.editForm.get(['id']).value,
      dummy: this.editForm.get(['dummy']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDummyEnums>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
