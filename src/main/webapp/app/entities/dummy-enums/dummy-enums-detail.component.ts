import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDummyEnums } from 'app/shared/model/dummy-enums.model';

@Component({
  selector: 'btgrp-dummy-enums-detail',
  templateUrl: './dummy-enums-detail.component.html'
})
export class DummyEnumsDetailComponent implements OnInit {
  dummyEnums: IDummyEnums;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dummyEnums }) => {
      this.dummyEnums = dummyEnums;
    });
  }

  previousState() {
    window.history.back();
  }
}
