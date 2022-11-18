export class AppointmentReserved {
  constructor(
    public readonly id: number,
    public readonly doctorId: number,
    public readonly patientId: number,
    public readonly medicalCenterId: number,
    public readonly date: string,
    public readonly paymentMethodId: number
  ) {}
}