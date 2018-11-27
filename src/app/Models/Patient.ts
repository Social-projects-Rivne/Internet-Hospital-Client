import { IllnessHistory } from '../Models/IllnessHistory';

export class Patient {
    id: number;
    firstName: string;
    secondName: string;
    thirdName: string;
    birthDate: string;
    phoneNumber: string;
    illnessHistory: IllnessHistory[];
}
