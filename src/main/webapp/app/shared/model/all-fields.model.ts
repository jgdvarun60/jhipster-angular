import { Moment } from 'moment';

export interface IAllFields {
  id?: number;
  doubleField?: number;
  floatField?: number;
  longField?: number;
  instantField?: Moment;
  durationField?: number;
  stringField?: string;
}

export class AllFields implements IAllFields {
  constructor(
    public id?: number,
    public doubleField?: number,
    public floatField?: number,
    public longField?: number,
    public instantField?: Moment,
    public durationField?: number,
    public stringField?: string
  ) {}
}
