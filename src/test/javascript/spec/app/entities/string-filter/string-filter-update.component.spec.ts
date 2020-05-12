import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProTrackTestModule } from '../../../test.module';
import { StringFilterUpdateComponent } from 'app/entities/string-filter/string-filter-update.component';
import { StringFilterService } from 'app/entities/string-filter/string-filter.service';
import { StringFilter } from 'app/shared/model/string-filter.model';

describe('Component Tests', () => {
  describe('StringFilter Management Update Component', () => {
    let comp: StringFilterUpdateComponent;
    let fixture: ComponentFixture<StringFilterUpdateComponent>;
    let service: StringFilterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [StringFilterUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(StringFilterUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StringFilterUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StringFilterService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new StringFilter(123);
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
        const entity = new StringFilter();
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
