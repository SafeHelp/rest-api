export class ClientName {
  private readonly firstname: string;
  private readonly lastname: string;

  constructor(firstname: string, lastname: string) { this.firstname = firstname; this.lastname = lastname; }

  public static create(firstname: string, lastname: string): ClientName {
    firstname = (firstname ?? '').trim();
    lastname = (lastname ?? '').trim();
    return new ClientName(firstname, lastname);
  }

  public getLastname(): string { return this.lastname; }
  public getFirstname(): string { return this.firstname; }
}
