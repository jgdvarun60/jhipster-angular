import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRangeFilter } from 'app/shared/model/range-filter.model';

@Component({
  selector: 'btgrp-range-filter-detail',
  templateUrl: './range-filter-detail.component.html'
})
export class RangeFilterDetailComponent implements OnInit {
  rangeFilter: IRangeFilter;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rangeFilter }) => {
      this.rangeFilter = rangeFilter;
    });
  }

  previousState() {
    window.history.back();
  }
}
