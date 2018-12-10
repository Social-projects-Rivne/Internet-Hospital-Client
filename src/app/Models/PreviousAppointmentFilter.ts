export class PreviousAppointmentFilter {
    from: Date;
    till: Date;
    searchKey: string;
    pageIndex: number;
    pageSize: number;
    statuses: number[];

    getUrl(): string {
        let url = `/?page=${this.pageIndex + 1}&pageCount=${this.pageSize}`;
        if (this.searchKey) {
            url += `&searchbyname=${this.searchKey}`;
        }
        if (this.from) {
            url += `&from=${this.from}`;
        }
        if (this.till) {
            url += `&till=${this.till}`;
        }
        if (this.statuses && this.statuses.length > 0) {
            url += `&statuses=${this.statuses.join(`&statuses=`)}`;
        }
        return url;
    }
}
