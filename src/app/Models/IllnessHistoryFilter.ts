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
      url += `&from=${this.fromDate}`;
    }
    if (this.toDate) {
      url += `&till=${this.toDate}`;
    }
    return url;
  }
}
