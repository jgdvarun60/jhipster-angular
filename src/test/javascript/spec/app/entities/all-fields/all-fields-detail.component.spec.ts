import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProTrackTestModule } from '../../../test.module';
import { AllFieldsDetailComponent } from 'app/entities/all-fields/all-fields-detail.component';
import { AllFields } from 'app/shared/model/all-fields.model';

describe('Component Tests', () => {
  describe('AllFields Management Detail Component', () => {
    let comp: AllFieldsDetailComponent;
    let fixture: ComponentFixture<AllFieldsDetailComponent>;
    const route = ({ data: of({ allFields: new AllFields(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [AllFieldsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AllFieldsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AllFieldsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.allFields).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
