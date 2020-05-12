import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProTrackTestModule } from '../../../test.module';
import { AllFieldsUpdateComponent } from 'app/entities/all-fields/all-fields-update.component';
import { AllFieldsService } from 'app/entities/all-fields/all-fields.service';
import { AllFields } from 'app/shared/model/all-fields.model';

describe('Component Tests', () => {
  describe('AllFields Management Update Component', () => {
    let comp: AllFieldsUpdateComponent;
    let fixture: ComponentFixture<AllFieldsUpdateComponent>;
    let service: AllFieldsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [AllFieldsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AllFieldsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AllFieldsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AllFieldsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AllFields(123);
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
        const entity = new AllFields();
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
