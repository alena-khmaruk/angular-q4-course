import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {SearchComponent} from './search.component';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchComponent],
            imports: [FormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit filterCourses event with searchValue on searchCourse method call', fakeAsync(() => {
        component.filterCourses.subscribe((value) => {
            expect(value).toBe('eee');
        });
        component.onKeyUp('e');
        component.onKeyUp('ee');
        component.onKeyUp('eee');
        tick(500);
    }));
});
