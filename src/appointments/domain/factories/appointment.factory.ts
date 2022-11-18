import { AppointmentId } from "../agregates/appointment/appointment-id.value";
import { DoctorId } from "../../../clients/domain/aggregates/client/doctor-id.value";
import { PatientId } from "../../../clients/domain/aggregates/client/patient-id.value";
import { MedicalCenterId } from "../../../medical-centers/domain/aggregates/medical-center/medical-center-id.value";
import { PaymentMethodId } from "../../../shared/domain/aggregates/payment/payment-method-id.value";
import { Appointment } from "../agregates/appointment/appointment.root.entity";
import { AppointmentDate } from "../agregates/appointment/appointment-date.value";

export class AppointmentFactory {
  public static withId(
    id: AppointmentId,
    doctorId: DoctorId,
    patientId: PatientId,
    medicalCenterId: MedicalCenterId,
    appointmentDate: AppointmentDate,
    paymentMethodId: PaymentMethodId
  ): Appointment{
    const appointment = new Appointment(doctorId, patientId, medicalCenterId, paymentMethodId, appointmentDate);
    appointment.changeId(id);
    return appointment;
  }

  public static from(
    doctorId: DoctorId,
    patientId: PatientId,
    medicalCenterId: MedicalCenterId,
    appointmentDate: AppointmentDate,
    paymentMethodId: PaymentMethodId
  ): Appointment {
    return new Appointment(doctorId, patientId, medicalCenterId, paymentMethodId, appointmentDate);
  }

}