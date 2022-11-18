import { Column } from "typeorm";

export class PaymentMethodIdValue {
  @Column('bigint', { name: 'payment_method_id', unsigned: true, nullable: false })
  public value: number;

  private constructor(value: number) { this.value = value; }

  public static from(value: number) { return new PaymentMethodIdValue(value); }
}