import { IEventHandler } from "@nestjs/cqrs";
import { AppointmentCanceled } from "../../../../appointments/domain/events/appointment-canceled.event";
import { EventsHandler } from "@nestjs/cqrs/dist/decorators/events-handler.decorator";

@EventsHandler(AppointmentCanceled)
export class AppointmentCanceledHandler implements IEventHandler<AppointmentCanceled> {
  constructor() {}
  
  handle(event: AppointmentCanceled): any { console.log(event); }
}