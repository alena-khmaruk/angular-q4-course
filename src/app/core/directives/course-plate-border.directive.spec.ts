import {CoursePlateBorderDirective} from './course-plate-border.directive';
import {Component, DebugElement, ElementRef} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

@Component({
    template: `
        <div id="green" [vcCoursePlateBorder]="today"></div>
        <div id="blue" [vcCoursePlateBorder]="future"></div>
        <div id="none" [vcCoursePlateBorder]="past"></div>
    `
})
class TestPlateComponent {
    public today: Date = new Date();
    public past: Date = new Date('2018-11-11');
    public future: Date = new Date('2099-11-11');
}

describe('CoursePlateBorderDirective', () => {
    let component: TestPlateComponent;
    let fixture: ComponentFixture<TestPlateComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestPlateComponent, CoursePlateBorderDirective]
        });
        fixture = TestBed.createComponent(TestPlateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should add green border for course with current date', () => {
        const divElement: DebugElement = fixture.debugElement.query(By.css('#green'));
        expect(divElement.nativeElement.style.border).toEqual('1px solid rgb(155, 200, 55)');
    });

    it('should add blue border for course with future date', () => {
        const divElement: DebugElement = fixture.debugElement.query(By.css('#blue'));
        expect(divElement.nativeElement.style.border).toEqual('1px solid rgb(87, 124, 230)');
    });

    it('should not add border for course with past date', () => {
        const divElement: DebugElement = fixture.debugElement.query(By.css('#none'));
        expect(divElement.nativeElement.style.border).toEqual('');
    });
});
