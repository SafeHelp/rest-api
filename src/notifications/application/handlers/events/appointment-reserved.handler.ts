import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { AppointmentReserved } from "../../../../appointments/domain/events/appointment-reserved.event";

@EventsHandler(AppointmentReserved)
export class AppointmentReservedHandler
  implements IEventHandler<AppointmentReserved>
{
  constructor() {}

  async handle(event: AppointmentReserved) { console.log(event); }
}
