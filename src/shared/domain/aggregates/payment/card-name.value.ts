export class CardName {
  private readonly name: string;
  constructor(name: string) { this.name = name; }


  public getValue(): string { return this.name; }

  public static create(cardName: string) { return new CardName(cardName); }
}