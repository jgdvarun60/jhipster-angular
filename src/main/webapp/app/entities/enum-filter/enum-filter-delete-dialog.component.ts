import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEnumFilter } from 'app/shared/model/enum-filter.model';
import { EnumFilterService } from './enum-filter.service';

@Component({
  selector: 'btgrp-enum-filter-delete-dialog',
  templateUrl: './enum-filter-delete-dialog.component.html'
})
export class EnumFilterDeleteDialogComponent {
  enumFilter: IEnumFilter;

  constructor(
    protected enumFilterService: EnumFilterService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.enumFilterService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'enumFilterListModification',
        content: 'Deleted an enumFilter'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'btgrp-enum-filter-delete-popup',
  template: ''
})
export class EnumFilterDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ enumFilter }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EnumFilterDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.enumFilter = enumFilter;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/enum-filter', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/enum-filter', { outlets: { popup: null } }]);
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
