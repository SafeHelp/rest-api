export class ReserveAppointmentRequest {
  constructor(
    public readonly doctorId: number,
    public readonly patientId: number,
    public readonly medicalCenterId: number,
    public readonly date: string,
    public readonly paymentMethodId: number
  ) {}
}