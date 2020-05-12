import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStringFilter } from 'app/shared/model/string-filter.model';

@Component({
  selector: 'btgrp-string-filter-detail',
  templateUrl: './string-filter-detail.component.html'
})
export class StringFilterDetailComponent implements OnInit {
  stringFilter: IStringFilter;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ stringFilter }) => {
      this.stringFilter = stringFilter;
    });
  }

  previousState() {
    window.history.back();
  }
}
