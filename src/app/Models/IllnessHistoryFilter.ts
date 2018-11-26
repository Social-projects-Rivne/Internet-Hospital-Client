export class IllnessHistoryFilter {
    fromDate: Date;
    toDate: Date;
    isWithParams: boolean;

    public CheckIfPropertyExist(): void {
      this.isWithParams = this.fromDate || this.toDate ? true : false;
    }
  }
