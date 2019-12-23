export interface ICourse {
    id: number;
    name: string;
    date: Date;
    length: number;
    description: string;
    isTopRated: boolean;
}

export class Course implements ICourse {
    public id: number;
    public name: string;
    public date: Date;
    public length: number;
    public description: string;
    public isTopRated: boolean;

    constructor() {
        this.id = Math.floor(Math.random() * 100 + 1000);
        this.name = '';
        this.date = new Date();
        this.length = 0;
        this.description = '';
        this.isTopRated = false;
    }
}
