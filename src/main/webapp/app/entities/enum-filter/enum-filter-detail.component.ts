import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEnumFilter } from 'app/shared/model/enum-filter.model';

@Component({
  selector: 'btgrp-enum-filter-detail',
  templateUrl: './enum-filter-detail.component.html'
})
export class EnumFilterDetailComponent implements OnInit {
  enumFilter: IEnumFilter;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ enumFilter }) => {
      this.enumFilter = enumFilter;
    });
  }

  previousState() {
    window.history.back();
  }
}
