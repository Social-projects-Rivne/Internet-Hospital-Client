export class DoctorFilter {
    selectedSpecialization = '';
    searchKey: string;
    isWithParams: boolean;

    public CheckIfPropertyExist(): void {
      this.isWithParams = this.searchKey || this.selectedSpecialization ? true : false;
    }
  }
