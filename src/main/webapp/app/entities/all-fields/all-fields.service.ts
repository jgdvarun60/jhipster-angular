import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAllFields } from 'app/shared/model/all-fields.model';

type EntityResponseType = HttpResponse<IAllFields>;
type EntityArrayResponseType = HttpResponse<IAllFields[]>;

@Injectable({ providedIn: 'root' })
export class AllFieldsService {
  public resourceUrl = SERVER_API_URL + 'api/all-fields';

  constructor(protected http: HttpClient) {}

  create(allFields: IAllFields): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(allFields);
    return this.http
      .post<IAllFields>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(allFields: IAllFields): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(allFields);
    return this.http
      .put<IAllFields>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAllFields>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAllFields[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(allFields: IAllFields): IAllFields {
    const copy: IAllFields = Object.assign({}, allFields, {
      instantField: allFields.instantField != null && allFields.instantField.isValid() ? allFields.instantField.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.instantField = res.body.instantField != null ? moment(res.body.instantField) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((allFields: IAllFields) => {
        allFields.instantField = allFields.instantField != null ? moment(allFields.instantField) : null;
      });
    }
    return res;
  }
}
