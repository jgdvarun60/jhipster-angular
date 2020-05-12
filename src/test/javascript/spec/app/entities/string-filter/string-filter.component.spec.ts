import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProTrackTestModule } from '../../../test.module';
import { StringFilterComponent } from 'app/entities/string-filter/string-filter.component';
import { StringFilterService } from 'app/entities/string-filter/string-filter.service';
import { StringFilter } from 'app/shared/model/string-filter.model';

describe('Component Tests', () => {
  describe('StringFilter Management Component', () => {
    let comp: StringFilterComponent;
    let fixture: ComponentFixture<StringFilterComponent>;
    let service: StringFilterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [StringFilterComponent],
        providers: []
      })
        .overrideTemplate(StringFilterComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StringFilterComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StringFilterService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new StringFilter(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.stringFilters[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
