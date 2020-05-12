import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IDummy, Dummy } from 'app/shared/model/dummy.model';
import { DummyService } from './dummy.service';

@Component({
  selector: 'btgrp-dummy-update',
  templateUrl: './dummy-update.component.html'
})
export class DummyUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    dummy: []
  });

  constructor(protected dummyService: DummyService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ dummy }) => {
      this.updateForm(dummy);
    });
  }

  updateForm(dummy: IDummy) {
    this.editForm.patchValue({
      id: dummy.id,
      dummy: dummy.dummy
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const dummy = this.createFromForm();
    if (dummy.id !== undefined) {
      this.subscribeToSaveResponse(this.dummyService.update(dummy));
    } else {
      this.subscribeToSaveResponse(this.dummyService.create(dummy));
    }
  }

  private createFromForm(): IDummy {
    return {
      ...new Dummy(),
      id: this.editForm.get(['id']).value,
      dummy: this.editForm.get(['dummy']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDummy>>) {
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
