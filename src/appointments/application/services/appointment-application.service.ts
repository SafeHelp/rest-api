import { Inject, Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ReserveAppointmentValidator } from "../validators/reserve-appointment.validator";
import {
  APPOINTMENT_REPOSITORY,
  IAppointmentRepository
} from "../../domain/agregates/appointment/appointment.repository";
import { ReserveAppointmentRequest } from "../dtos/request/reserve-appointment-request.dto";
import { AppointmentMapper } from "../mappers/appointment.mapper";
import { Result } from "typescript-result";
import { AppNotification } from "../../../shared/application/app.notification";
import { DeclineAppointmentRequest } from "../dtos/request/decline-appointment-request.dto";

@Injectable()
export class AppointmentApplicationService {
  constructor(
    private commandBus: CommandBus,
    private reserveAppointmentValidator: ReserveAppointmentValidator,
    @Inject(APPOINTMENT_REPOSITORY) private appointmentRepository: IAppointmentRepository
  ) {
  }

  async reserve(reserveAppointmentRequest: ReserveAppointmentRequest): Promise<Result<AppNotification, ReserveAppointmentRequest>> {
    const reserveAppointment = AppointmentMapper.dtoReserveRequestToCommand(reserveAppointmentRequest);
    const notification = await this.reserveAppointmentValidator.validate(reserveAppointment);

    if(notification.hasErrors()) return Result.error(notification);

    const appointment = await this.commandBus.execute(reserveAppointment);
    const response = AppointmentMapper.domainToDtoReserveResponse(appointment);

    return Result.ok(response);
  }

  async decline(declineAppointmentRequest: DeclineAppointmentRequest): Promise<Result<AppNotification, DeclineAppointmentRequest>> {
    const declineAppointment = AppointmentMapper.dtoDeclineRequestToCommand(declineAppointmentRequest);

    const appointment = await this.commandBus.execute(declineAppointment);

    const response = AppointmentMapper.domainToDtoDeclineResponse(appointment);



    if(response == null || response.id === 0) {
      const notification = new AppNotification();
      notification.addError("This appointment doesn't exist", null)
      return Result.error(notification);
    }

    return Result.ok(response);
  }

  async getById(id: number) {
    return await this.appointmentRepository.getById(id);
  }

  async getAll() {
    return await this.appointmentRepository.getAll();
  }


}