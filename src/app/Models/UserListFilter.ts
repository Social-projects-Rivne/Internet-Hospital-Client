export class UserListFilter {
    selectedStatus = '';
    searchKey: string;
    isWithParams: boolean;

    public CheckIfPropertyExist(): void {
        this.isWithParams = this.searchKey || this.selectedStatus ? true : false;
    }
}
