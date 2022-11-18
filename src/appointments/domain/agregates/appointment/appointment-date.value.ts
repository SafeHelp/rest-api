export class AppointmentDate {
  private date: string;

  constructor(date: string) { this.date = date; }

  public getValue(): string { return this.date; }
  public changeDate(date: string): void { this.date = date; }

  public static of(date: string): AppointmentDate { return new AppointmentDate(date); }

}