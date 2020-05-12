import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAllFields } from 'app/shared/model/all-fields.model';
import { AllFieldsService } from './all-fields.service';

@Component({
  selector: 'btgrp-all-fields-delete-dialog',
  templateUrl: './all-fields-delete-dialog.component.html'
})
export class AllFieldsDeleteDialogComponent {
  allFields: IAllFields;

  constructor(protected allFieldsService: AllFieldsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.allFieldsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'allFieldsListModification',
        content: 'Deleted an allFields'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'btgrp-all-fields-delete-popup',
  template: ''
})
export class AllFieldsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ allFields }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AllFieldsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.allFields = allFields;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/all-fields', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/all-fields', { outlets: { popup: null } }]);
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
