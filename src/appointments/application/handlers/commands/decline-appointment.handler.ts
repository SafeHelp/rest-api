import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { DeclineAppointment } from "../../messages/commands/decline-appointment,command";
import { DataSource } from "typeorm";
import { Inject } from "@nestjs/common";
import {
  APPOINTMENT_REPOSITORY,
  IAppointmentRepository
} from "../../../domain/agregates/appointment/appointment.repository";
import { AppointmentMapper } from "../../mappers/appointment.mapper";
import { AppointmentId } from "../../../domain/agregates/appointment/appointment-id.value";

@CommandHandler(DeclineAppointment)
export class DeclineAppointmentHandler implements ICommandHandler<DeclineAppointment> {
  constructor(
    private dataSource: DataSource,
    @Inject(APPOINTMENT_REPOSITORY) private readonly appointmentRepository: IAppointmentRepository,
    private publisher: EventPublisher
  ) {}
  async execute(command: DeclineAppointment) {

    let appointment = AppointmentMapper.commandDeclineToDomain(command);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const deleted = await this.appointmentRepository.delete(command.id);

      console.log(deleted);

      if(deleted == null || !deleted) throw new Error('')

      appointment.decline();
      appointment.commit();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      appointment.changeId(AppointmentId.of(0));
    } finally {
      await queryRunner.release();
    }

    return appointment;
  }

}