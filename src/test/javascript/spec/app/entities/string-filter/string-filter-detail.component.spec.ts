import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProTrackTestModule } from '../../../test.module';
import { StringFilterDetailComponent } from 'app/entities/string-filter/string-filter-detail.component';
import { StringFilter } from 'app/shared/model/string-filter.model';

describe('Component Tests', () => {
  describe('StringFilter Management Detail Component', () => {
    let comp: StringFilterDetailComponent;
    let fixture: ComponentFixture<StringFilterDetailComponent>;
    const route = ({ data: of({ stringFilter: new StringFilter(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [StringFilterDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(StringFilterDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StringFilterDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.stringFilter).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
