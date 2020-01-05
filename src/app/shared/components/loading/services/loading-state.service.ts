import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingStateService {
    public show: BehaviorSubject<boolean> = new BehaviorSubject(true);

    constructor() {}

    public updateState(value: boolean) {
        this.show.next(value);
    }
}
