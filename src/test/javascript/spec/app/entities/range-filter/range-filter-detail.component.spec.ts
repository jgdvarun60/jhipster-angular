import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProTrackTestModule } from '../../../test.module';
import { RangeFilterDetailComponent } from 'app/entities/range-filter/range-filter-detail.component';
import { RangeFilter } from 'app/shared/model/range-filter.model';

describe('Component Tests', () => {
  describe('RangeFilter Management Detail Component', () => {
    let comp: RangeFilterDetailComponent;
    let fixture: ComponentFixture<RangeFilterDetailComponent>;
    const route = ({ data: of({ rangeFilter: new RangeFilter(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [RangeFilterDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RangeFilterDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RangeFilterDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rangeFilter).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
