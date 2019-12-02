import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {DateInputComponent} from './date-input.component';

describe('DateInputComponent', () => {
    let component: DateInputComponent;
    let fixture: ComponentFixture<DateInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [DateInputComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DateInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit update data event on blur event', () => {
        let testData: Date;
        component.dateCreation = new Date('2011/11/11');
        component.updateDate.subscribe((value) => testData = value);
        component.onBlur();
        expect(testData).toEqual(component.dateCreation);
    });
});
