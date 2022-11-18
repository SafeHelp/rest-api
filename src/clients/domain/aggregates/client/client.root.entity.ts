import { ClientName } from "./client-name.value";
import { Dni } from "../../../../shared/domain/values/dni.value";
import { Age } from "../../../../shared/domain/values/age.value";
import { ClientType } from "./client-type.enum";
import { AggregateRoot } from "@nestjs/cqrs";
import { ClientId } from "./client-id.value";

export class Client extends AggregateRoot {
  private id: ClientId;
  private name: ClientName;
  private dni: Dni;
  private age: Age;
  private readonly clientType: ClientType;

  constructor(userType: ClientType, name: ClientName, dni: Dni, age: Age) {
    super();
    this.name = name;
    this.dni = dni;
    this.age = age;
    this.clientType = userType;
  }

  public getId(): ClientId { return this.id; }
  public changeId(id: ClientId): void { this.id = id; }

  public getName(): ClientName { return this.name; }
  public changeName(name: ClientName): void { this.name = name; }

  public getDni(): Dni { return this.dni; }
  public changeDni(dni: Dni): void { this.dni = dni; }

  public getType(): ClientType { return this.clientType; }
}