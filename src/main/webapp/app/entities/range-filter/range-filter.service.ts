import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRangeFilter } from 'app/shared/model/range-filter.model';

type EntityResponseType = HttpResponse<IRangeFilter>;
type EntityArrayResponseType = HttpResponse<IRangeFilter[]>;

@Injectable({ providedIn: 'root' })
export class RangeFilterService {
  public resourceUrl = SERVER_API_URL + 'api/range-filters';

  constructor(protected http: HttpClient) {}

  create(rangeFilter: IRangeFilter): Observable<EntityResponseType> {
    return this.http.post<IRangeFilter>(this.resourceUrl, rangeFilter, { observe: 'response' });
  }

  update(rangeFilter: IRangeFilter): Observable<EntityResponseType> {
    return this.http.put<IRangeFilter>(this.resourceUrl, rangeFilter, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRangeFilter>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRangeFilter[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
