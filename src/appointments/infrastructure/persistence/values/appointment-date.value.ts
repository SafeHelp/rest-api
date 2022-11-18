import { Column } from "typeorm";

export class AppointmentDateValue {
  @Column('varchar', {name: 'date', nullable: false, length: 10})
  public value: string;

  private constructor(value: string) { this.value = value; }

  public static from(value: string) { return new AppointmentDateValue(value); }
}