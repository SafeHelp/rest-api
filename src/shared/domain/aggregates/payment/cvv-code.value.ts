export class CvvCode {
  private readonly code: string;
  constructor(code: string) { this.code = (code ?? '').trim(); }

  public getValue(): string { return this.code; }

  public static create(code: string): CvvCode { return new CvvCode(code); }
}