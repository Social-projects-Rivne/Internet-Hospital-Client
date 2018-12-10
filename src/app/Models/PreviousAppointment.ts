import { IllnessHistory } from './IllnessHistory';

export class PreviousAppointment {
    userFullName: string;
    status: string;
    startTime: Date;
    endTime: Date;
    illnessHistory: IllnessHistory;
}
