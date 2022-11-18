import { ReserveAppointmentRequest } from "../dtos/request/reserve-appointment-request.dto";
import { ReserveAppointment } from "../messages/commands/reserve-appointment.command";
import { Appointment } from "../../domain/agregates/appointment/appointment.root.entity";
import { ReserveAppointmentResponse } from "../dtos/response/reserve-appointment-response.dto";
import { AppointmentFactory } from "../../domain/factories/appointment.factory";
import { AppointmentDate } from "../../domain/agregates/appointment/appointment-date.value";
import { DoctorId } from "../../../clients/domain/aggregates/client/doctor-id.value";
import { PatientId } from "../../../clients/domain/aggregates/client/patient-id.value";
import { MedicalCenterId } from "../../../medical-centers/domain/aggregates/medical-center/medical-center-id.value";
import { PaymentMethodId } from "../../../shared/domain/aggregates/payment/payment-method-id.value";
import { AppointmentEntity } from "../../infrastructure/persistence/entities/appointment.entity";
import { DoctorIdValue } from "../../infrastructure/persistence/values/doctor-id.value";
import { PatientIdValue } from "../../infrastructure/persistence/values/patient-id.value";
import { MedicalCenterIdValue } from "../../infrastructure/persistence/values/medical-center-id.value";
import { AppointmentDateValue } from "../../infrastructure/persistence/values/appointment-date.value";
import { PaymentMethodIdValue } from "../../infrastructure/persistence/values/payment-method-id.value";
import { AppointmentId } from "../../domain/agregates/appointment/appointment-id.value";
import { AppointmentDto } from "../dtos/response/appointment.dto";
import { DeclineAppointment } from "../messages/commands/decline-appointment,command";
import { DeclineAppointmentRequest } from "../dtos/request/decline-appointment-request.dto";
import { DeclineAppointmentResponse } from "../dtos/response/decline-appointment-response.dto";

export class AppointmentMapper {
  public static dtoReserveRequestToCommand(reserveAppointmentRequest: ReserveAppointmentRequest) {
    return new ReserveAppointment(
      reserveAppointmentRequest.doctorId,
      reserveAppointmentRequest.patientId,
      reserveAppointmentRequest.medicalCenterId,
      reserveAppointmentRequest.date,
      reserveAppointmentRequest.paymentMethodId
    );
  }

  public static dtoDeclineRequestToCommand(declineAppointmentRequest: DeclineAppointmentRequest) {
    return new DeclineAppointment(declineAppointmentRequest.id);
  }

  public static domainToDtoReserveResponse(appointment: Appointment) {
    return new ReserveAppointmentResponse(
      appointment.getId().getValue(),
      appointment.getDoctor().getValue(),
      appointment.getPatient().getValue(),
      appointment.getMedicalCenter().getValue(),
      appointment.getDate().getValue(),
      appointment.getPaymentMethod().getValue()
    );
  }

  public static domainToDtoDeclineResponse(appointment: Appointment) {
    return new DeclineAppointmentResponse(appointment.getId().getValue());
  }

  public static commandReserveToDomain(command: ReserveAppointment) {

    const appointmentDate = AppointmentDate.of(command.date);
    return AppointmentFactory.from(
      DoctorId.of(command.doctorId),
      PatientId.of(command.patientId),
      MedicalCenterId.of(command.medicalCenterId),
      appointmentDate,
      PaymentMethodId.of(command.paymentMethodId)
    );
  }

  public static commandDeclineToDomain(command: DeclineAppointment) {
    return AppointmentFactory.withId(
      AppointmentId.of(command.id),
      null,
      null,
      null,
      null,
      null
    )
  }

  public static domainToEntity(appointment: Appointment) {
    const appointmentEntity = new AppointmentEntity();
    appointmentEntity.doctorId = DoctorIdValue.from(appointment.getDoctor().getValue());
    appointmentEntity.patientId = PatientIdValue.from(appointment.getPatient().getValue());
    appointmentEntity.medicalCenterId = MedicalCenterIdValue.from(appointment.getMedicalCenter().getValue());
    appointmentEntity.date = AppointmentDateValue.from(appointment.getDate().getValue());
    appointmentEntity.paymentMethodId = PaymentMethodIdValue.from(appointment.getPaymentMethod().getValue());

    return appointmentEntity;
  }

  public static entityToDomain(appointmentEntity: AppointmentEntity) {
    if(appointmentEntity == null)
      return null;

    return AppointmentFactory.withId(
      AppointmentId.of(appointmentEntity.id),
      DoctorId.of(appointmentEntity.doctorId.value),
      AppointmentId.of(appointmentEntity.patientId.value),
      MedicalCenterId.of(appointmentEntity.medicalCenterId.value),
      AppointmentDate.of(appointmentEntity.date.value),
      PaymentMethodId.of(appointmentEntity.paymentMethodId.value)
    )
  }

  public static ormToAppointmentDto(row: any) {
    const dto = new AppointmentDto();
    dto.id = Number(row.id);
    dto.doctorId = row.doctorId;
    dto.patientId = row.patientId;
    dto.medicalCenterId = row.medicalCenterId;
    dto.date = row.date;
    dto.paymentMethodId = row.paymentMethodId;
    return dto;
  }

  public static appointmentToAppointmentDto(appointment: Appointment) {
    const dto = new AppointmentDto();
    dto.id = appointment.getId().getValue();
    dto.doctorId = appointment.getDoctor().getValue();
    dto.patientId = appointment.getPatient().getValue();
    dto.paymentMethodId = appointment.getPaymentMethod().getValue();
    dto.date = appointment.getDate().getValue();

    return dto;
  }

}