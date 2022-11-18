import { Column } from "typeorm";

export class DoctorIdValue {
  @Column('bigint', { name: 'doctor_id', unsigned: true, nullable: false })
  public value: number;

  private constructor(value: number) { this.value = value; }

  public static from(value: number) { return new DoctorIdValue(value); }
}