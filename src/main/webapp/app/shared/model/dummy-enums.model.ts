import { DummyEnum } from 'app/shared/model/enumerations/dummy-enum.model';

export interface IDummyEnums {
  id?: number;
  dummy?: DummyEnum;
}

export class DummyEnums implements IDummyEnums {
  constructor(public id?: number, public dummy?: DummyEnum) {}
}
