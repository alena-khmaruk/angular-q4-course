import {ICourse} from '../interfaces/course.interface';

export class Course implements ICourse {
    public id: string;
    public title: string;
    public creationDate: Date;
    public duration: number;
    public description: string;

    constructor() {

    }
}
