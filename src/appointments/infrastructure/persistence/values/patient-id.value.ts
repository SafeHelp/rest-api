import { Column } from "typeorm";

export class PatientIdValue {
  @Column('bigint', { name: 'patient_id', unsigned: true, nullable: false })
  public value: number;

  private constructor(value: number) { this.value = value; }

  public static from(value: number) { return new PatientIdValue(value); }
}