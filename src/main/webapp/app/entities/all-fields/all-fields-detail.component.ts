import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAllFields } from 'app/shared/model/all-fields.model';

@Component({
  selector: 'btgrp-all-fields-detail',
  templateUrl: './all-fields-detail.component.html'
})
export class AllFieldsDetailComponent implements OnInit {
  allFields: IAllFields;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ allFields }) => {
      this.allFields = allFields;
    });
  }

  previousState() {
    window.history.back();
  }
}
