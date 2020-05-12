import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStringFilter } from 'app/shared/model/string-filter.model';
import { StringFilterService } from './string-filter.service';

@Component({
  selector: 'btgrp-string-filter-delete-dialog',
  templateUrl: './string-filter-delete-dialog.component.html'
})
export class StringFilterDeleteDialogComponent {
  stringFilter: IStringFilter;

  constructor(
    protected stringFilterService: StringFilterService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.stringFilterService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'stringFilterListModification',
        content: 'Deleted an stringFilter'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'btgrp-string-filter-delete-popup',
  template: ''
})
export class StringFilterDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ stringFilter }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(StringFilterDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.stringFilter = stringFilter;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/string-filter', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/string-filter', { outlets: { popup: null } }]);
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
