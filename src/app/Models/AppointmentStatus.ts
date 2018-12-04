
export class AppointmentStatus {
    name: string;
    value: number;
    checked = false;

    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }
}
