import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProTrackTestModule } from '../../../test.module';
import { EnumFilterComponent } from 'app/entities/enum-filter/enum-filter.component';
import { EnumFilterService } from 'app/entities/enum-filter/enum-filter.service';
import { EnumFilter } from 'app/shared/model/enum-filter.model';

describe('Component Tests', () => {
  describe('EnumFilter Management Component', () => {
    let comp: EnumFilterComponent;
    let fixture: ComponentFixture<EnumFilterComponent>;
    let service: EnumFilterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [EnumFilterComponent],
        providers: []
      })
        .overrideTemplate(EnumFilterComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EnumFilterComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EnumFilterService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EnumFilter(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.enumFilters[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
