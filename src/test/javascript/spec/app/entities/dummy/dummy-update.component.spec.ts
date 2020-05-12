import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProTrackTestModule } from '../../../test.module';
import { DummyUpdateComponent } from 'app/entities/dummy/dummy-update.component';
import { DummyService } from 'app/entities/dummy/dummy.service';
import { Dummy } from 'app/shared/model/dummy.model';

describe('Component Tests', () => {
  describe('Dummy Management Update Component', () => {
    let comp: DummyUpdateComponent;
    let fixture: ComponentFixture<DummyUpdateComponent>;
    let service: DummyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [DummyUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DummyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DummyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DummyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Dummy(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Dummy();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
