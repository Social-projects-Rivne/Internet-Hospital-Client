import { IllnessHistory } from '../Models/IllnessHistory';

export class Patient {
    id: number;
    firstName: string;
    secondName: string;
    thirdName: string;
    birthDate: Date;
    phoneNumber: string;
    illnessHistory: IllnessHistory[];
}
