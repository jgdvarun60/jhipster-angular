import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStringFilter } from 'app/shared/model/string-filter.model';

type EntityResponseType = HttpResponse<IStringFilter>;
type EntityArrayResponseType = HttpResponse<IStringFilter[]>;

@Injectable({ providedIn: 'root' })
export class StringFilterService {
  public resourceUrl = SERVER_API_URL + 'api/string-filters';

  constructor(protected http: HttpClient) {}

  create(stringFilter: IStringFilter): Observable<EntityResponseType> {
    return this.http.post<IStringFilter>(this.resourceUrl, stringFilter, { observe: 'response' });
  }

  update(stringFilter: IStringFilter): Observable<EntityResponseType> {
    return this.http.put<IStringFilter>(this.resourceUrl, stringFilter, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStringFilter>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStringFilter[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
