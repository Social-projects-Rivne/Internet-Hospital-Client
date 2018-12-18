export class IllnessHistoryFilter {
  fromDate: Date;
  toDate: Date;
  isWithParams: boolean;
  pageIndex: number;
  pageSize: number;

  public CheckIfPropertyExist(): void {
    this.isWithParams = this.fromDate || this.toDate ? true : false;
  }

  public getUrl(): string {
    let url = `/?page=${this.pageIndex + 1}&pageCount=${this.pageSize}`;
    if (this.fromDate) {
      url += `&SearchFromDate=${this.fromDate.toDateString()}`;
    }
    if (this.toDate) {
      url += `&SearchToDate=${this.toDate.toDateString()}`;
    }
    return url;
  }
}
