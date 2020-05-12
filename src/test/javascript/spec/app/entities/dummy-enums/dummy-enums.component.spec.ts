import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProTrackTestModule } from '../../../test.module';
import { DummyEnumsComponent } from 'app/entities/dummy-enums/dummy-enums.component';
import { DummyEnumsService } from 'app/entities/dummy-enums/dummy-enums.service';
import { DummyEnums } from 'app/shared/model/dummy-enums.model';

describe('Component Tests', () => {
  describe('DummyEnums Management Component', () => {
    let comp: DummyEnumsComponent;
    let fixture: ComponentFixture<DummyEnumsComponent>;
    let service: DummyEnumsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [DummyEnumsComponent],
        providers: []
      })
        .overrideTemplate(DummyEnumsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DummyEnumsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DummyEnumsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DummyEnums(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.dummyEnums[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
