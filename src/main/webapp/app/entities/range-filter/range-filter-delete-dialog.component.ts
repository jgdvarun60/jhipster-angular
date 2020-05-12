import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRangeFilter } from 'app/shared/model/range-filter.model';
import { RangeFilterService } from './range-filter.service';

@Component({
  selector: 'btgrp-range-filter-delete-dialog',
  templateUrl: './range-filter-delete-dialog.component.html'
})
export class RangeFilterDeleteDialogComponent {
  rangeFilter: IRangeFilter;

  constructor(
    protected rangeFilterService: RangeFilterService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.rangeFilterService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'rangeFilterListModification',
        content: 'Deleted an rangeFilter'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'btgrp-range-filter-delete-popup',
  template: ''
})
export class RangeFilterDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rangeFilter }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RangeFilterDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.rangeFilter = rangeFilter;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/range-filter', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/range-filter', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
