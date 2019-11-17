import {Component, Input, OnInit} from '@angular/core';
import {User} from './user.model';

@Component({
    selector: 'vc-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    @Input() public user: User;

    constructor() {}

    public ngOnInit(): void {}

}
