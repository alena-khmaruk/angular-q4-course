import {Component} from '@angular/core';

@Component({
    selector: 'vc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor() {}

    public onActivate(): void {
        window.scrollTo(0, 0);
    }
}
