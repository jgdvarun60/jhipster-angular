import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDummyEnums } from 'app/shared/model/dummy-enums.model';

type EntityResponseType = HttpResponse<IDummyEnums>;
type EntityArrayResponseType = HttpResponse<IDummyEnums[]>;

@Injectable({ providedIn: 'root' })
export class DummyEnumsService {
  public resourceUrl = SERVER_API_URL + 'api/dummy-enums';

  constructor(protected http: HttpClient) {}

  create(dummyEnums: IDummyEnums): Observable<EntityResponseType> {
    return this.http.post<IDummyEnums>(this.resourceUrl, dummyEnums, { observe: 'response' });
  }

  update(dummyEnums: IDummyEnums): Observable<EntityResponseType> {
    return this.http.put<IDummyEnums>(this.resourceUrl, dummyEnums, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDummyEnums>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDummyEnums[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
