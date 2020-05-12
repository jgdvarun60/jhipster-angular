import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProTrackTestModule } from '../../../test.module';
import { RangeFilterComponent } from 'app/entities/range-filter/range-filter.component';
import { RangeFilterService } from 'app/entities/range-filter/range-filter.service';
import { RangeFilter } from 'app/shared/model/range-filter.model';

describe('Component Tests', () => {
  describe('RangeFilter Management Component', () => {
    let comp: RangeFilterComponent;
    let fixture: ComponentFixture<RangeFilterComponent>;
    let service: RangeFilterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [RangeFilterComponent],
        providers: []
      })
        .overrideTemplate(RangeFilterComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RangeFilterComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RangeFilterService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RangeFilter(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.rangeFilters[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
