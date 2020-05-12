import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProTrackTestModule } from '../../../test.module';
import { DummyComponent } from 'app/entities/dummy/dummy.component';
import { DummyService } from 'app/entities/dummy/dummy.service';
import { Dummy } from 'app/shared/model/dummy.model';

describe('Component Tests', () => {
  describe('Dummy Management Component', () => {
    let comp: DummyComponent;
    let fixture: ComponentFixture<DummyComponent>;
    let service: DummyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [DummyComponent],
        providers: []
      })
        .overrideTemplate(DummyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DummyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DummyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Dummy(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.dummies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
