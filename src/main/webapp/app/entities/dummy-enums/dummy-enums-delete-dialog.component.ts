import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDummyEnums } from 'app/shared/model/dummy-enums.model';
import { DummyEnumsService } from './dummy-enums.service';

@Component({
  selector: 'btgrp-dummy-enums-delete-dialog',
  templateUrl: './dummy-enums-delete-dialog.component.html'
})
export class DummyEnumsDeleteDialogComponent {
  dummyEnums: IDummyEnums;

  constructor(
    protected dummyEnumsService: DummyEnumsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.dummyEnumsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'dummyEnumsListModification',
        content: 'Deleted an dummyEnums'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'btgrp-dummy-enums-delete-popup',
  template: ''
})
export class DummyEnumsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dummyEnums }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DummyEnumsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.dummyEnums = dummyEnums;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/dummy-enums', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/dummy-enums', { outlets: { popup: null } }]);
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
