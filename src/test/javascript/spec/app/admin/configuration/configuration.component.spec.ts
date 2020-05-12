import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProTrackTestModule } from '../../../test.module';
import { BtgrpConfigurationComponent } from 'app/admin/configuration/configuration.component';
import { BtgrpConfigurationService } from 'app/admin/configuration/configuration.service';

describe('Component Tests', () => {
  describe('BtgrpConfigurationComponent', () => {
    let comp: BtgrpConfigurationComponent;
    let fixture: ComponentFixture<BtgrpConfigurationComponent>;
    let service: BtgrpConfigurationService;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [BtgrpConfigurationComponent],
        providers: [BtgrpConfigurationService]
      })
        .overrideTemplate(BtgrpConfigurationComponent, '')
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(BtgrpConfigurationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BtgrpConfigurationService);
    });

    describe('OnInit', () => {
      it('should set all default values correctly', () => {
        expect(comp.configKeys).toEqual([]);
        expect(comp.filter).toBe('');
        expect(comp.orderProp).toBe('prefix');
        expect(comp.reverse).toBe(false);
      });
      it('Should call load all on init', () => {
        // GIVEN
        const body = [{ config: 'test', properties: 'test' }, { config: 'test2' }];
        const envConfig = { envConfig: 'test' };
        spyOn(service, 'get').and.returnValue(of(body));
        spyOn(service, 'getEnv').and.returnValue(of(envConfig));

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(service.get).toHaveBeenCalled();
        expect(service.getEnv).toHaveBeenCalled();
        expect(comp.configKeys).toEqual([['0', '1', '2', '3']]);
        expect(comp.allConfiguration).toEqual(envConfig);
      });
    });
    describe('keys method', () => {
      it('should return the keys of an Object', () => {
        // GIVEN
        const data = {
          key1: 'test',
          key2: 'test2'
        };

        // THEN
        expect(comp.keys(data)).toEqual(['key1', 'key2']);
        expect(comp.keys(undefined)).toEqual([]);
      });
    });
  });
});
