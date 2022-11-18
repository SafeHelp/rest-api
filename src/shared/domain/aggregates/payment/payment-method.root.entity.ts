import { CardName } from "./card-name.value";
import { CvvCode } from "./cvv-code.value";
import { CardNumber } from "./card-number.value";
import { CardExpirationDate } from "./card-expiration-date.value";
import { AggregateRoot } from "@nestjs/cqrs";
import { PaymentMethodId } from "./payment-method-id.value";

export class PaymentMethod extends AggregateRoot {

  private id: PaymentMethodId;
  private readonly name: CardName;
  private readonly cvv: CvvCode;
  private readonly number: CardNumber;
  private readonly expirationDate: CardExpirationDate;

  constructor(name: CardName, cvv: CvvCode, number: CardNumber, expirationDate: CardExpirationDate) {
    super();
    this.name = name;
    this.cvv = cvv;
    this.number = number;
    this.expirationDate = expirationDate;
  }

  public static create(name: CardName, cvv: CvvCode, number: CardNumber, expirationDate:CardExpirationDate){ return new PaymentMethod(name, cvv, number, expirationDate); }

  public getId(): PaymentMethodId { return this.id; }
  public changeId(id: PaymentMethodId): void { this.id = id; }
}