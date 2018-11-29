export class UserListFilter {
    selectedStatus: number;
    searchKey: string;
    isWithParams: boolean;

    public CheckIfPropertyExist(): void {
        this.isWithParams = this.searchKey || this.selectedStatus ? true : false;
    }
}
