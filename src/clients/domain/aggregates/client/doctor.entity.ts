import { Client } from "./client.root.entity";
import { ClientType } from "./client-type.enum";
import { ClientName } from "./client-name.value";
import { Dni } from "../../../../shared/domain/values/dni.value";
import { Age } from "../../../../shared/domain/values/age.value";

export class Doctor extends Client {

  constructor(name: ClientName, dni: Dni, age: Age) {
    super(ClientType.DOCTOR, name, dni, age);
  }
}