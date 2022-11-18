import { Column } from "typeorm";

export class MedicalCenterIdValue {
  @Column('bigint', { name: 'medical_center_id', unsigned: true, nullable: false })
  public value: number;

  private constructor(value: number) { this.value = value; }

  public static from(value: number) { return new MedicalCenterIdValue(value); }
}