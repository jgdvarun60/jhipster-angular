import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDummy } from 'app/shared/model/dummy.model';
import { DummyService } from './dummy.service';

@Component({
  selector: 'btgrp-dummy-delete-dialog',
  templateUrl: './dummy-delete-dialog.component.html'
})
export class DummyDeleteDialogComponent {
  dummy: IDummy;

  constructor(protected dummyService: DummyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.dummyService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'dummyListModification',
        content: 'Deleted an dummy'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'btgrp-dummy-delete-popup',
  template: ''
})
export class DummyDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dummy }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DummyDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.dummy = dummy;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/dummy', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/dummy', { outlets: { popup: null } }]);
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
