import { Inject, Injectable } from "@nestjs/common";
import {
  APPOINTMENT_REPOSITORY,
  IAppointmentRepository
} from "../../domain/agregates/appointment/appointment.repository";
import { ReserveAppointment } from "../messages/commands/reserve-appointment.command";
import { AppNotification } from "../../../shared/application/app.notification";

@Injectable()
export class ReserveAppointmentValidator {
  constructor(@Inject(APPOINTMENT_REPOSITORY) private appointmentRepository: IAppointmentRepository) {}

  public async validate(reserveAppointment: ReserveAppointment) {
    const notification = new AppNotification();

    if(this.isRequeridError(reserveAppointment.doctorId))
      notification.addError('doctorId is requerid', null);
    if(this.isRequeridError(reserveAppointment.patientId))
      notification.addError('patientId is requerid', null);
    if(this.isRequeridError(reserveAppointment.medicalCenterId))
      notification.addError('medicalCenterId is requerid', null);
    if(this.isRequeridError(reserveAppointment.date))
      notification.addError('date is requerid', null);
    if(this.isRequeridError(reserveAppointment.paymentMethodId))
      notification.addError('paymentMethodId is requerid', null);

    return notification;
  }

  private textLengthIsLowerThan(text: string, minLength: number){
    const value = text ? text.trim() : '';
    return value.length <= minLength;
  }

  private isRequeridError(text: string | number){
    if(text === undefined) return true;

    console.log(text);

    if(typeof text === 'string')
      return this.textLengthIsLowerThan(text, 0);

    return this.textLengthIsLowerThan(text?.toString(), 0);
  }
}