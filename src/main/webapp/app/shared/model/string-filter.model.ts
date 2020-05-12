import { IDummy } from 'app/shared/model/dummy.model';

export interface IStringFilter {
  id?: number;
  title?: string;
  expression?: string;
  hide?: boolean;
  contains?: string;
  equals?: string;
  inArr?: string;
  specified?: boolean;
  inlists?: IDummy[];
}

export class StringFilter implements IStringFilter {
  constructor(
    public id?: number,
    public title?: string,
    public expression?: string,
    public hide?: boolean,
    public contains?: string,
    public equals?: string,
    public inArr?: string,
    public specified?: boolean,
    public inlists?: IDummy[]
  ) {
    this.hide = this.hide || false;
    this.specified = this.specified || false;
  }
}
