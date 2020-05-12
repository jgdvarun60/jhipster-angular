import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDummy } from 'app/shared/model/dummy.model';

@Component({
  selector: 'btgrp-dummy-detail',
  templateUrl: './dummy-detail.component.html'
})
export class DummyDetailComponent implements OnInit {
  dummy: IDummy;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dummy }) => {
      this.dummy = dummy;
    });
  }

  previousState() {
    window.history.back();
  }
}
