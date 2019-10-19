import {UserInterface} from '../interfaces/user.interface';

export class User implements UserInterface {
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
