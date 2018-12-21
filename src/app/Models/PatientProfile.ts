import { IllnessHistory } from '../Models/IllnessHistory';

export class PatientProfile {
    id: number;
    firstName: string;
    secondName: string;
    thirdName: string;
    birthDate: Date;
    phoneNumber: string;
    illnessHistory: IllnessHistory[];
}
