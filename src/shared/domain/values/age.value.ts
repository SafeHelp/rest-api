export class Age {

  private readonly value: number;
  private static MIN_AGE = 18;
  private static MAX_AGE = 80;

  constructor(value: number) { this.value = value; }

  public getValue(): number { return this.value; }

  public static create(age: number): Age {
    age = age < Age.MIN_AGE || age > Age.MAX_AGE ? Age.MIN_AGE : age;
    return new Age(age);
  }
}