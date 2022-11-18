export class CardExpirationDate {
  private readonly date: string;

  constructor(date: string) { this.date = (date ?? '').trim(); }

  public getValue(): string { return this.date; }
  public static create(date: string) { return new CardExpirationDate(date); }
}