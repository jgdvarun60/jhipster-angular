import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDummy } from 'app/shared/model/dummy.model';

type EntityResponseType = HttpResponse<IDummy>;
type EntityArrayResponseType = HttpResponse<IDummy[]>;

@Injectable({ providedIn: 'root' })
export class DummyService {
  public resourceUrl = SERVER_API_URL + 'api/dummies';

  constructor(protected http: HttpClient) {}

  create(dummy: IDummy): Observable<EntityResponseType> {
    return this.http.post<IDummy>(this.resourceUrl, dummy, { observe: 'response' });
  }

  update(dummy: IDummy): Observable<EntityResponseType> {
    return this.http.put<IDummy>(this.resourceUrl, dummy, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDummy>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDummy[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
