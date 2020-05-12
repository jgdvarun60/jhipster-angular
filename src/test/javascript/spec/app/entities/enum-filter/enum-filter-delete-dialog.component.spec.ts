import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProTrackTestModule } from '../../../test.module';
import { EnumFilterDeleteDialogComponent } from 'app/entities/enum-filter/enum-filter-delete-dialog.component';
import { EnumFilterService } from 'app/entities/enum-filter/enum-filter.service';

describe('Component Tests', () => {
  describe('EnumFilter Management Delete Component', () => {
    let comp: EnumFilterDeleteDialogComponent;
    let fixture: ComponentFixture<EnumFilterDeleteDialogComponent>;
    let service: EnumFilterService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [EnumFilterDeleteDialogComponent]
      })
        .overrideTemplate(EnumFilterDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EnumFilterDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EnumFilterService);
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
