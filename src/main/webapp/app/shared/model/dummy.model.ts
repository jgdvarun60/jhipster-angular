export interface IDummy {
  id?: number;
  dummy?: string;
}

export class Dummy implements IDummy {
  constructor(public id?: number, public dummy?: string) {}
}
