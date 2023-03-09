export class Deal {
    constructor(
      public id: number,
      public number: number,
      public sum: number,
      public returnDate: string,
      public registrationDate: string,
      public client: number,
      public clientName: string
    ) {}
}