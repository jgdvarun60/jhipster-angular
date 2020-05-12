import { IDummy } from 'app/shared/model/dummy.model';

export interface IRangeFilter {
  id?: number;
  title?: string;
  expression?: string;
  hide?: boolean;
  equals?: string;
  greaterThan?: string;
  greaterThanOrEqual?: string;
  inArr?: string;
  lessThan?: string;
  lessThanOrEqual?: string;
  specified?: boolean;
  inLists?: IDummy[];
}

export class RangeFilter implements IRangeFilter {
  constructor(
    public id?: number,
    public title?: string,
    public expression?: string,
    public hide?: boolean,
    public equals?: string,
    public greaterThan?: string,
    public greaterThanOrEqual?: string,
    public inArr?: string,
    public lessThan?: string,
    public lessThanOrEqual?: string,
    public specified?: boolean,
    public inLists?: IDummy[]
  ) {
    this.hide = this.hide || false;
    this.specified = this.specified || false;
  }
}
