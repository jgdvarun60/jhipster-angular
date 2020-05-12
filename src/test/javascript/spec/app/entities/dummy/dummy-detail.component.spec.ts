import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProTrackTestModule } from '../../../test.module';
import { DummyDetailComponent } from 'app/entities/dummy/dummy-detail.component';
import { Dummy } from 'app/shared/model/dummy.model';

describe('Component Tests', () => {
  describe('Dummy Management Detail Component', () => {
    let comp: DummyDetailComponent;
    let fixture: ComponentFixture<DummyDetailComponent>;
    const route = ({ data: of({ dummy: new Dummy(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [DummyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DummyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DummyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dummy).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
