import {Component, OnInit} from '@angular/core';
import {User} from '../../entities/user.entity';

@Component({
    selector: 'vc-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user: User;

    constructor() {
        this.user = new User({
            id: 'user_1',
            firstName: 'Alena',
            lastName: 'Khmaruk'
        });
    }

    ngOnInit() {
    }

}
