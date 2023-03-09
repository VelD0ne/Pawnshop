export class Lease {
    constructor(
      public id: number,
      public date: string,
      public product: number,
      public productName: string,
      public deal: number,
      public dealName: string,
    ) {}
}