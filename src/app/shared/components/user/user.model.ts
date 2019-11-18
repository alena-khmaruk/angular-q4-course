export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    getFullName(): string;
}

export class User implements IUser {
    public id: string;
    public firstName: string;
    public lastName: string;

    constructor(firstName: string, lastName: string) {
        this.id = `${firstName}_${lastName}`;
        this.lastName = lastName;
        this.firstName = firstName;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
