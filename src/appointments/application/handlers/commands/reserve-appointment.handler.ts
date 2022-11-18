import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { ReserveAppointment } from "../../messages/commands/reserve-appointment.command";
import { DataSource } from "typeorm";
import { Inject } from "@nestjs/common";
import {
  APPOINTMENT_REPOSITORY,
  IAppointmentRepository
} from "../../../domain/agregates/appointment/appointment.repository";
import { AppointmentMapper } from "../../mappers/appointment.mapper";

@CommandHandler(ReserveAppointment)
export class ReserveAppointmentHandler implements ICommandHandler<ReserveAppointment> {

  constructor(
    private dataSource: DataSource,
    @Inject(APPOINTMENT_REPOSITORY) private readonly appointmentRepository: IAppointmentRepository,
    private publisher: EventPublisher
  ) {}

  async execute(command: ReserveAppointment) {
    let appointment = AppointmentMapper.commandReserveToDomain(command);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      appointment = await this.appointmentRepository.create(appointment);
      if(appointment == null) throw new Error('');

      appointment = this.publisher.mergeObjectContext(appointment);
      appointment.reserve();
      appointment.commit();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      appointment = null;
    } finally {
      await queryRunner.release();
    }

    return appointment;
  }
}