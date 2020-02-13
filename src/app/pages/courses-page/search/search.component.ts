import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';

@Component({
    selector: 'vc-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
    public searchValue = new Subject<string>();
    private _subscription: Subscription;
    @Output() public filterCourses: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

    public ngOnInit(): void {
        this._subscription = this._searchSubscription();
    }

    public ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    public onKeyUp(value: string): void {
        this.searchValue.next(value);
    }

    private _searchSubscription(): Subscription {
        return this.searchValue.pipe(
            filter((value) => value.length > 2 || !value.length),
            debounceTime(400),
            distinctUntilChanged()
        ).subscribe((value: string) => {
            this.filterCourses.emit(value);
        });
    }
}
