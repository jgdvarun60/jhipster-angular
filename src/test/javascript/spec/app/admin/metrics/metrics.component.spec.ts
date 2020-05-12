import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProTrackTestModule } from '../../../test.module';
import { BtgrpMetricsMonitoringComponent } from 'app/admin/metrics/metrics.component';
import { BtgrpMetricsService } from 'app/admin/metrics/metrics.service';

describe('Component Tests', () => {
  describe('BtgrpMetricsMonitoringComponent', () => {
    let comp: BtgrpMetricsMonitoringComponent;
    let fixture: ComponentFixture<BtgrpMetricsMonitoringComponent>;
    let service: BtgrpMetricsService;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ProTrackTestModule],
        declarations: [BtgrpMetricsMonitoringComponent]
      })
        .overrideTemplate(BtgrpMetricsMonitoringComponent, '')
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(BtgrpMetricsMonitoringComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BtgrpMetricsService);
    });

    describe('refresh', () => {
      it('should call refresh on init', () => {
        // GIVEN
        const response = {
          timers: {
            service: 'test',
            unrelatedKey: 'test'
          },
          gauges: {
            'jcache.statistics': {
              value: 2
            },
            unrelatedKey: 'test'
          }
        };
        spyOn(service, 'getMetrics').and.returnValue(of(response));

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(service.getMetrics).toHaveBeenCalled();
      });
    });
  });
});
