import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {Pipe, PipeTransform} from '@angular/core';

import {DurationInputComponent} from './duration-input.component';

@Pipe({name: 'time'})
class MockTimePipe implements PipeTransform {
    transform(value: number): string {
        return '1h 40m';
    }
}

describe('DurationInputComponent', () => {
    let component: DurationInputComponent;
    let fixture: ComponentFixture<DurationInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [DurationInputComponent, MockTimePipe]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DurationInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit update duration event on blur event', () => {
        let testData: number;
        component.duration = 100;
        component.updateDuration.subscribe((value) => testData = value);
        component.onBlur();
        expect(testData).toEqual(100);
    });
});
