import { IllnessHistory } from '../Models/Illness-history';

export class Patient {
    id: number;
    firstName: string;
    secondName: string;
    thirdName: string;
    birthDate: string;
    phoneNumber: string;
    illnessHistory: IllnessHistory[];
}
