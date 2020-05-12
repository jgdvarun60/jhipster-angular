import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProTrackTestModule } from '../../../test.module';
import { AllFieldsDeleteDialogComponent } from 'app/entities/all-fields/all-fields-delete-dialog.component';
import { AllFieldsService } from 'app/entities/all-fields/all-fields.service';

describe('Component Tests', () => {
  describe('AllFields Management Delete Component', () => {
    let comp: AllFieldsDeleteDialogComponent;
    let fixture: ComponentFixture<AllFieldsDeleteDialogComponent>;
    let service: AllFieldsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [AllFieldsDeleteDialogComponent]
      })
        .overrideTemplate(AllFieldsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AllFieldsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AllFieldsService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
