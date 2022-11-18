import { Doctor } from "./doctor.entity";
import { Client } from "./client.root.entity";
import { ClientType } from "./client-type.enum";
import { ClientName } from "./client-name.value";
import { Dni } from "../../../../shared/domain/values/dni.value";
import { Age } from "../../../../shared/domain/values/age.value";

export class Patient extends Client {
  private favoriteDoctors: Doctor[] = [];

  constructor(name: ClientName, dni: Dni, age: Age) {
    super(ClientType.PATIENT, name, dni, age);
  }

  public addFavoriteDoctor(doctor: Doctor) { this.favoriteDoctors.push(doctor); }

  public getFavoriteDoctors(): Doctor[] { return this.favoriteDoctors; }
}