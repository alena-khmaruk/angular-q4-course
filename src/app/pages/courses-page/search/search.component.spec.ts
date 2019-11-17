import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {SearchComponent} from './search.component';
import {By} from '@angular/platform-browser';

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

    it('should call searchCourse method on button click', () => {
        spyOn(component, 'searchCourse');
        const searchButton = fixture.debugElement.query(By.css('.vc-search__button'));
        searchButton.nativeElement.click();
        expect(component.searchCourse).toHaveBeenCalled();
    });

    it('should emit filterCourses event with searchValue on searchCourse method call', () => {
        let testId = '';
        component.searchValue = 'search';
        component.filterCourses.subscribe((value) => testId = value);
        component.searchCourse();
        expect(testId).toBe('search');
    });
});
