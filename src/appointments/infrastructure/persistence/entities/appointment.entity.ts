import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PatientIdValue } from "../values/patient-id.value";
import { DoctorIdValue } from "../values/doctor-id.value";
import { PaymentMethodIdValue } from "../values/payment-method-id.value";
import { AppointmentDateValue } from "../values/appointment-date.value";
import { MedicalCenterIdValue } from "../values/medical-center-id.value";

@Entity("appointments")
export class AppointmentEntity {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  public id: number;

  @Column((type) => PatientIdValue, { prefix: false })
  public patientId: PatientIdValue;

  @Column((type) => DoctorIdValue, { prefix: false })
  public doctorId: DoctorIdValue;

  @Column((type) => MedicalCenterIdValue, { prefix: false })
  public medicalCenterId: MedicalCenterIdValue;

  @Column((type) => PaymentMethodIdValue, { prefix: false })
  public paymentMethodId: PaymentMethodIdValue;

  @Column((type)=> AppointmentDateValue, { prefix: false })
  public date: AppointmentDateValue;
}