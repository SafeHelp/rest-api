import { Module } from '@nestjs/common';
import { AppointmentController } from './interface/rest/appointment.controller';
import { ReserveAppointmentHandler } from "./application/handlers/commands/reserve-appointment.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppointmentEntity } from "./infrastructure/persistence/entities/appointment.entity";
import { AppointmentRepository } from "./infrastructure/persistence/repositories/appointment.repository";
import { APPOINTMENT_REPOSITORY } from "./domain/agregates/appointment/appointment.repository";
import { AppointmentApplicationService } from "./application/services/appointment-application.service";
import { ReserveAppointmentValidator } from "./application/validators/reserve-appointment.validator";
import { AppointmentReservedHandler } from "../notifications/application/handlers/events/appointment-reserved.handler";
import { DeclineAppointmentHandler } from "./application/handlers/commands/decline-appointment.handler";
import { AppointmentCanceledHandler } from "../notifications/application/handlers/events/appointment-canceled.handler";

export const CommandHandlers = [ReserveAppointmentHandler, DeclineAppointmentHandler];
export const EventHandlers = [AppointmentReservedHandler, AppointmentCanceledHandler];

@Module({
  imports:[
    CqrsModule,
    TypeOrmModule.forFeature([AppointmentEntity]),
  ],
  exports: [TypeOrmModule],
  controllers: [AppointmentController],
  providers: [
    { useClass: AppointmentRepository, provide: APPOINTMENT_REPOSITORY },
    AppointmentApplicationService,
    ReserveAppointmentValidator,
    AppointmentRepository,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class AppointmentsModule {}
