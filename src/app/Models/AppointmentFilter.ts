export class AppointmentFilter {
    from: Date;
    till: Date;
    isWithParams = false;

    public CheckIfPropertyExist(): void {
      this.isWithParams = this.from || this.till ? true : false;
    }
  }
