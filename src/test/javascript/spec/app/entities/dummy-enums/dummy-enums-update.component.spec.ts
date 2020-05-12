import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProTrackTestModule } from '../../../test.module';
import { DummyEnumsUpdateComponent } from 'app/entities/dummy-enums/dummy-enums-update.component';
import { DummyEnumsService } from 'app/entities/dummy-enums/dummy-enums.service';
import { DummyEnums } from 'app/shared/model/dummy-enums.model';

describe('Component Tests', () => {
  describe('DummyEnums Management Update Component', () => {
    let comp: DummyEnumsUpdateComponent;
    let fixture: ComponentFixture<DummyEnumsUpdateComponent>;
    let service: DummyEnumsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [DummyEnumsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DummyEnumsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DummyEnumsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DummyEnumsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DummyEnums(123);
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
        const entity = new DummyEnums();
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
