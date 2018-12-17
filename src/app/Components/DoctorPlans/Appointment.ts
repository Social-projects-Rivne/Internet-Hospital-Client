import { IllnessHistory } from 'src/app/Models/IllnessHistory';

export class Appointment {
    id: number;
    userId: number;
    userFirstName: string;
    userSecondName: string;
    address: string;
    status: string;
    startTime: Date;
    endTime: Date;
    isAllowPatientInfo: boolean;
    illnessHistory: IllnessHistory;
}
