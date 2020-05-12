import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProTrackTestModule } from '../../../test.module';
import { AllFieldsComponent } from 'app/entities/all-fields/all-fields.component';
import { AllFieldsService } from 'app/entities/all-fields/all-fields.service';
import { AllFields } from 'app/shared/model/all-fields.model';

describe('Component Tests', () => {
  describe('AllFields Management Component', () => {
    let comp: AllFieldsComponent;
    let fixture: ComponentFixture<AllFieldsComponent>;
    let service: AllFieldsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [AllFieldsComponent],
        providers: []
      })
        .overrideTemplate(AllFieldsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AllFieldsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AllFieldsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AllFields(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.allFields[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
