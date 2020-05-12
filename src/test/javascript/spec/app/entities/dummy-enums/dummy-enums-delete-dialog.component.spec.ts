import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProTrackTestModule } from '../../../test.module';
import { DummyEnumsDeleteDialogComponent } from 'app/entities/dummy-enums/dummy-enums-delete-dialog.component';
import { DummyEnumsService } from 'app/entities/dummy-enums/dummy-enums.service';

describe('Component Tests', () => {
  describe('DummyEnums Management Delete Component', () => {
    let comp: DummyEnumsDeleteDialogComponent;
    let fixture: ComponentFixture<DummyEnumsDeleteDialogComponent>;
    let service: DummyEnumsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [DummyEnumsDeleteDialogComponent]
      })
        .overrideTemplate(DummyEnumsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DummyEnumsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DummyEnumsService);
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
