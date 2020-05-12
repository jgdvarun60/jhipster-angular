import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IAllFields, AllFields } from 'app/shared/model/all-fields.model';
import { AllFieldsService } from './all-fields.service';

@Component({
  selector: 'btgrp-all-fields-update',
  templateUrl: './all-fields-update.component.html'
})
export class AllFieldsUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    doubleField: [null, [Validators.min(2), Validators.max(5)]],
    floatField: [null, [Validators.min(2), Validators.max(5)]],
    longField: [null, [Validators.min(2), Validators.max(5)]],
    instantField: [],
    durationField: [],
    stringField: [null, [Validators.minLength(3), Validators.maxLength(25), Validators.pattern('^[A-Z][a-z]+d$')]]
  });

  constructor(protected allFieldsService: AllFieldsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ allFields }) => {
      this.updateForm(allFields);
    });
  }

  updateForm(allFields: IAllFields) {
    this.editForm.patchValue({
      id: allFields.id,
      doubleField: allFields.doubleField,
      floatField: allFields.floatField,
      longField: allFields.longField,
      instantField: allFields.instantField != null ? allFields.instantField.format(DATE_TIME_FORMAT) : null,
      durationField: allFields.durationField,
      stringField: allFields.stringField
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const allFields = this.createFromForm();
    if (allFields.id !== undefined) {
      this.subscribeToSaveResponse(this.allFieldsService.update(allFields));
    } else {
      this.subscribeToSaveResponse(this.allFieldsService.create(allFields));
    }
  }

  private createFromForm(): IAllFields {
    return {
      ...new AllFields(),
      id: this.editForm.get(['id']).value,
      doubleField: this.editForm.get(['doubleField']).value,
      floatField: this.editForm.get(['floatField']).value,
      longField: this.editForm.get(['longField']).value,
      instantField:
        this.editForm.get(['instantField']).value != null ? moment(this.editForm.get(['instantField']).value, DATE_TIME_FORMAT) : undefined,
      durationField: this.editForm.get(['durationField']).value,
      stringField: this.editForm.get(['stringField']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAllFields>>) {
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
