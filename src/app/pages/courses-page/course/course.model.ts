import * as moment from 'moment';

interface AuthorModel {
    id: string;
    name: string;
    lastName: string;
}

export interface ICourse {
    id: number;
    name: string;
    date: string;
    length: number;
    description: string;
    isTopRated: boolean;
    authors: AuthorModel[];
}

export class Course implements ICourse {
    public id: number;
    public name: string;
    public date: string;
    public length: number;
    public description: string;
    public isTopRated: boolean;
    public authors: AuthorModel[];

    constructor() {
        this.id = Math.floor(Math.random() * 100 + 1000);
        this.name = '';
        this.date = moment().format();
        this.length = 0;
        this.description = '';
        this.isTopRated = false;
        this.authors = [];
    }
}
