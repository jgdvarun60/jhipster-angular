import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProTrackTestModule } from '../../../test.module';
import { RangeFilterUpdateComponent } from 'app/entities/range-filter/range-filter-update.component';
import { RangeFilterService } from 'app/entities/range-filter/range-filter.service';
import { RangeFilter } from 'app/shared/model/range-filter.model';

describe('Component Tests', () => {
  describe('RangeFilter Management Update Component', () => {
    let comp: RangeFilterUpdateComponent;
    let fixture: ComponentFixture<RangeFilterUpdateComponent>;
    let service: RangeFilterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [RangeFilterUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RangeFilterUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RangeFilterUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RangeFilterService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RangeFilter(123);
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
        const entity = new RangeFilter();
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
