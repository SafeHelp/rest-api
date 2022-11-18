export class CardNumber {
  private readonly number: string;
  constructor(number: string) { this.number = (number ?? '').trim(); }

  public static create(number: string) { return new CardNumber(number); }
  public getValue(): string { return this.number; }
}