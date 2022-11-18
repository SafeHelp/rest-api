import { IAppointmentRepository } from "../../../domain/agregates/appointment/appointment.repository";
import { Appointment } from "../../../domain/agregates/appointment/appointment.root.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AppointmentEntity } from "../entities/appointment.entity";
import { Repository } from "typeorm";
import { AppointmentMapper } from "../../../application/mappers/appointment.mapper";

export class AppointmentRepository implements IAppointmentRepository {

  constructor(
    @InjectRepository(AppointmentEntity)
    private appointmentRepository: Repository<AppointmentEntity>
  ) {}

  async getAll(): Promise<Appointment[]> {
        const appointmentsEntities = await this.appointmentRepository.find();

        const appointments: Appointment[] = [];

        for(let appointment of appointmentsEntities)
          appointments.push(AppointmentMapper.entityToDomain(appointment));

        return appointments;
  }

  async create(appointment: Appointment): Promise<Appointment> {
    let appointmentEntity = AppointmentMapper.domainToEntity(appointment);
    appointmentEntity = await this.appointmentRepository.save(appointmentEntity);

    return AppointmentMapper.entityToDomain(appointmentEntity);
  }

  async delete(appointmentId: number): Promise<boolean> {
    const result = await this.appointmentRepository.delete({id: appointmentId});

    return result.affected !== 0;
  }

  async getById(id: number | string): Promise<Appointment> {

    const appointmentId = typeof id === 'string' ? Number(id): id;

    const appointment = await this.appointmentRepository.findOne({where: { id: appointmentId },});

    return AppointmentMapper.entityToDomain(appointment);
  }

  async update(appointment: Appointment): Promise<Appointment> {
    let appointmentEntity = AppointmentMapper.domainToEntity(appointment);
    const appointmentId = appointment.getId().getValue();

    await this.appointmentRepository.update({id: appointmentId}, appointmentEntity);

    return Promise.resolve(undefined);
  }

}