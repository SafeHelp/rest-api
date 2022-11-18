import { AggregateRoot } from "@nestjs/cqrs";
import { AppointmentId } from "./appointment-id.value";
import { DoctorId } from "../../../../clients/domain/aggregates/client/doctor-id.value";
import { PatientId } from "../../../../clients/domain/aggregates/client/patient-id.value";
import { AppointmentDate } from "./appointment-date.value";
import { MedicalCenterId } from "../../../../medical-centers/domain/aggregates/medical-center/medical-center-id.value";
import { PaymentMethodId } from "../../../../shared/domain/aggregates/payment/payment-method-id.value";
import { AppointmentReserved } from "../../events/appointment-reserved.event";
import { AppointmentCanceled } from "../../events/appointment-canceled.event";

export class Appointment extends AggregateRoot {
  private id: AppointmentId;
  private doctor: DoctorId;
  private readonly patient: PatientId;
  private medicalCenter: MedicalCenterId;
  private paymentMethod: PaymentMethodId;

  private date: AppointmentDate;


  constructor(doctor: DoctorId, patient: PatientId, medicalCenter: MedicalCenterId, paymentMethod: PaymentMethodId, date: AppointmentDate) {
    super();
    this.doctor = doctor;
    this.patient = patient;
    this.medicalCenter = medicalCenter;
    this.paymentMethod = paymentMethod;
    this.date = date;
  }

  public reserve() {
    const event = new AppointmentReserved(
      this.id.getValue(),
      this.doctor.getValue(),
      this.patient.getValue(),
      this.medicalCenter.getValue(),
      this.date.getValue(),
      this.paymentMethod.getValue()
    );

    this.apply(event);
  }

  public decline() {
    const event = new AppointmentCanceled(this.id.getValue());
    this.apply(event);
  }

  public getDate(): AppointmentDate { return this.date; }
  public getDoctor(): DoctorId { return this.doctor; }
  public getMedicalCenter(): MedicalCenterId { return this.medicalCenter; }
  public getId(): AppointmentId { return this.id; }
  public getPatient(): PatientId { return this.patient; }
  public getPaymentMethod(): PaymentMethodId { return this.paymentMethod; }


  public changeId(id: AppointmentId) { this.id = id; }
  public changeDate(date: AppointmentDate): void { this.date = date; }
  public changeDoctor(doctor: DoctorId): void { this.doctor = doctor; }
  public changeMedicalCenter(medicalCenter: MedicalCenterId): void { this.medicalCenter = medicalCenter; }
}