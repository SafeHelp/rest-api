import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsModule } from './appointments/appointments.module';
import { UsersModule } from "./users/users.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { ClientsModule } from "./clients/clients.module";
import { MedicalCentersModule } from "./medical-centers/medical-centers.module";
import { AppointmentEntity } from "./appointments/infrastructure/persistence/entities/appointment.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: 'mysql',
      database: 'safe-help',
      logging: true,
      timezone: '+00:00',
      bigNumberStrings: false,
      entities: [AppointmentEntity],
      synchronize: true
    }),
    AppointmentsModule,
    UsersModule,
    NotificationsModule,
    ClientsModule,
    MedicalCentersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
