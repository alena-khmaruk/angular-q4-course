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

    constructor(user) {
        this.id = user.id;
        this.lastName = user.lastName;
        this.firstName = user.firstName;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
