import { IDummyEnums } from 'app/shared/model/dummy-enums.model';
import { DummyEnum } from 'app/shared/model/enumerations/dummy-enum.model';

export interface IEnumFilter {
  id?: number;
  title?: string;
  expression?: string;
  hide?: boolean;
  equals?: DummyEnum;
  inArr?: DummyEnum;
  specified?: boolean;
  inlists?: IDummyEnums[];
}

export class EnumFilter implements IEnumFilter {
  constructor(
    public id?: number,
    public title?: string,
    public expression?: string,
    public hide?: boolean,
    public equals?: DummyEnum,
    public inArr?: DummyEnum,
    public specified?: boolean,
    public inlists?: IDummyEnums[]
  ) {
    this.hide = this.hide || false;
    this.specified = this.specified || false;
  }
}
