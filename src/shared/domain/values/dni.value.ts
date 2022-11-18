export class Dni {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string { return this.value; }

  public static create(value: string): Dni {
    value = (value ?? '').trim();
    return new Dni(value);
  }
}
