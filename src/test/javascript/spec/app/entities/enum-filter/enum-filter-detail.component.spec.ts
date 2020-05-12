import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProTrackTestModule } from '../../../test.module';
import { EnumFilterDetailComponent } from 'app/entities/enum-filter/enum-filter-detail.component';
import { EnumFilter } from 'app/shared/model/enum-filter.model';

describe('Component Tests', () => {
  describe('EnumFilter Management Detail Component', () => {
    let comp: EnumFilterDetailComponent;
    let fixture: ComponentFixture<EnumFilterDetailComponent>;
    const route = ({ data: of({ enumFilter: new EnumFilter(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [EnumFilterDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EnumFilterDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EnumFilterDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.enumFilter).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
