export class RequestFilter {
    selectedType: number;
    searchKey: string;
    isWithParams: boolean;

    public CheckIfPropertyExist(): void {
        this.isWithParams = this.searchKey || this.selectedType ? true : false;
    }
}
