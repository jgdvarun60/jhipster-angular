import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProTrackTestModule } from '../../../test.module';
import { DummyDeleteDialogComponent } from 'app/entities/dummy/dummy-delete-dialog.component';
import { DummyService } from 'app/entities/dummy/dummy.service';

describe('Component Tests', () => {
  describe('Dummy Management Delete Component', () => {
    let comp: DummyDeleteDialogComponent;
    let fixture: ComponentFixture<DummyDeleteDialogComponent>;
    let service: DummyService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [DummyDeleteDialogComponent]
      })
        .overrideTemplate(DummyDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DummyDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DummyService);
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
