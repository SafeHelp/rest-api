import { ApiProperty } from "@nestjs/swagger";

export class ReserveAppointmentRequest {
  @ApiProperty({
    description: 'doctorId'
  })
  public readonly doctorId: number;
  @ApiProperty({
    description: 'patientId'
  })
  public readonly patientId: number;
  @ApiProperty({
    description: 'medicalCenterId'
  })
  public readonly medicalCenterId: number;
  @ApiProperty({
    description: 'date',
    example: 'DD/MM/YYYY'
  })
  public readonly date: string;
  @ApiProperty({
    description: 'paymentMethodId'
  })
  public readonly paymentMethodId: number
  constructor(
    doctorId: number,
    patientId: number,
    medicalCenterId: number,
    date: string,
    paymentMethodId: number
  ) {
    this.doctorId = doctorId;
    this.patientId = patientId;
    this.medicalCenterId = medicalCenterId;
    this.date = date;
    this.paymentMethodId = paymentMethodId;
  }
}