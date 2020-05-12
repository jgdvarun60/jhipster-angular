import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEnumFilter } from 'app/shared/model/enum-filter.model';

type EntityResponseType = HttpResponse<IEnumFilter>;
type EntityArrayResponseType = HttpResponse<IEnumFilter[]>;

@Injectable({ providedIn: 'root' })
export class EnumFilterService {
  public resourceUrl = SERVER_API_URL + 'api/enum-filters';

  constructor(protected http: HttpClient) {}

  create(enumFilter: IEnumFilter): Observable<EntityResponseType> {
    return this.http.post<IEnumFilter>(this.resourceUrl, enumFilter, { observe: 'response' });
  }

  update(enumFilter: IEnumFilter): Observable<EntityResponseType> {
    return this.http.put<IEnumFilter>(this.resourceUrl, enumFilter, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEnumFilter>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEnumFilter[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
