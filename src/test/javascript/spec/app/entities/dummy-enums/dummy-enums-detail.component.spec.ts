import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProTrackTestModule } from '../../../test.module';
import { DummyEnumsDetailComponent } from 'app/entities/dummy-enums/dummy-enums-detail.component';
import { DummyEnums } from 'app/shared/model/dummy-enums.model';

describe('Component Tests', () => {
  describe('DummyEnums Management Detail Component', () => {
    let comp: DummyEnumsDetailComponent;
    let fixture: ComponentFixture<DummyEnumsDetailComponent>;
    const route = ({ data: of({ dummyEnums: new DummyEnums(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [DummyEnumsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DummyEnumsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DummyEnumsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dummyEnums).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
