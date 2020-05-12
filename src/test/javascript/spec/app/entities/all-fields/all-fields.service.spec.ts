import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AllFieldsService } from 'app/entities/all-fields/all-fields.service';
import { IAllFields, AllFields } from 'app/shared/model/all-fields.model';

describe('Service Tests', () => {
  describe('AllFields Service', () => {
    let injector: TestBed;
    let service: AllFieldsService;
    let httpMock: HttpTestingController;
    let elemDefault: IAllFields;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(AllFieldsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new AllFields(0, 0, 0, 0, currentDate, 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            instantField: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a AllFields', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            instantField: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            instantField: currentDate
          },
          returnedFromService
        );
        service
          .create(new AllFields(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a AllFields', () => {
        const returnedFromService = Object.assign(
          {
            doubleField: 1,
            floatField: 1,
            longField: 1,
            instantField: currentDate.format(DATE_TIME_FORMAT),
            durationField: 'BBBBBB',
            stringField: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            instantField: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of AllFields', () => {
        const returnedFromService = Object.assign(
          {
            doubleField: 1,
            floatField: 1,
            longField: 1,
            instantField: currentDate.format(DATE_TIME_FORMAT),
            durationField: 'BBBBBB',
            stringField: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            instantField: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a AllFields', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
