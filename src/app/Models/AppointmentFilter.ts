export class AppointmentFilter {
    from: Date;
    till: Date;
    isWithParams: boolean = false;

    public CheckIfPropertyExist(): void {
      this.isWithParams = this.from || this.till ? true : false;
    }
  }