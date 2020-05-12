import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProTrackTestModule } from '../../../test.module';
import { RangeFilterDeleteDialogComponent } from 'app/entities/range-filter/range-filter-delete-dialog.component';
import { RangeFilterService } from 'app/entities/range-filter/range-filter.service';

describe('Component Tests', () => {
  describe('RangeFilter Management Delete Component', () => {
    let comp: RangeFilterDeleteDialogComponent;
    let fixture: ComponentFixture<RangeFilterDeleteDialogComponent>;
    let service: RangeFilterService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [RangeFilterDeleteDialogComponent]
      })
        .overrideTemplate(RangeFilterDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RangeFilterDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RangeFilterService);
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
