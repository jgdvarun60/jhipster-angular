import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProTrackTestModule } from '../../../test.module';
import { EnumFilterUpdateComponent } from 'app/entities/enum-filter/enum-filter-update.component';
import { EnumFilterService } from 'app/entities/enum-filter/enum-filter.service';
import { EnumFilter } from 'app/shared/model/enum-filter.model';

describe('Component Tests', () => {
  describe('EnumFilter Management Update Component', () => {
    let comp: EnumFilterUpdateComponent;
    let fixture: ComponentFixture<EnumFilterUpdateComponent>;
    let service: EnumFilterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [EnumFilterUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EnumFilterUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EnumFilterUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EnumFilterService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EnumFilter(123);
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
        const entity = new EnumFilter();
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
