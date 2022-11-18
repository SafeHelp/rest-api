import { Controller, Post, Body, Res, Get, Param, Delete } from "@nestjs/common";
import { Result } from 'typescript-result';
import { QueryBus } from '@nestjs/cqrs';
import { ApiController, BASE_API_PATH } from "../../../shared/interface/rest/api.controller";
import { AppointmentApplicationService } from "../../application/services/appointment-application.service";
import { ReserveAppointmentRequest } from "../../application/dtos/request/reserve-appointment-request.dto";
import { AppNotification } from "../../../shared/application/app.notification";
import { Appointment } from "../../domain/agregates/appointment/appointment.root.entity";
import { AppointmentDto } from "../../application/dtos/response/appointment.dto";
import { AppointmentMapper } from "../../application/mappers/appointment.mapper";
import { DeclineAppointmentRequest } from "../../application/dtos/request/decline-appointment-request.dto";

@Controller(BASE_API_PATH + 'appointments')
export class AppointmentController {
  constructor(private readonly appointmentApplicationService: AppointmentApplicationService, private readonly queryBus: QueryBus) {}

  @Post('')
  async reserve(
    @Body() reserveAppointmentRequest: ReserveAppointmentRequest,
    @Res({ passthrough: true }) response
  ) {
    try {
      const result: Result<AppNotification, ReserveAppointmentRequest> = await this.appointmentApplicationService.reserve(reserveAppointmentRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (e) {
      return ApiController.serverError(response, e);
    }
  }

  @Delete('/:id')
  async decline(@Param('id') id: number, @Res({ passthrough: true }) response) {
    try {
      const result = await this.appointmentApplicationService.decline(new DeclineAppointmentRequest(id));
      if(result.isSuccess())
        return ApiController.ok(response, result.value);

      return ApiController.error(response, result.error.getErrors());
    } catch (e) {
      return ApiController.serverError(response, e);
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const appointment = await this.appointmentApplicationService.getById(id);
      return ApiController.ok(response, AppointmentMapper.appointmentToAppointmentDto(appointment));
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('')
  async getAll(@Res({ passthrough: true }) response) {
    try {
      const appointments = await this.appointmentApplicationService.getAll();
      const appointmentsResponse: AppointmentDto[] = [];

      for (let appointment of appointments)
        appointmentsResponse.push(AppointmentMapper.appointmentToAppointmentDto(appointment));

      return ApiController.ok(response, appointmentsResponse);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

}
