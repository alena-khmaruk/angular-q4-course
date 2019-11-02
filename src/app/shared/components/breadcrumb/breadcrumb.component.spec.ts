import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {BreadcrumbComponent} from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
    let component: BreadcrumbComponent;
    let fixture: ComponentFixture<BreadcrumbComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BreadcrumbComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BreadcrumbComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set up breadcrumbs array on component init', () => {
        expect(component.breadcrumbs).toEqual(['Courses']);
    });

    it('should display each breadcrumb in span tag', () => {
        const spanElements = fixture.debugElement.queryAll(By.css('span'));
        expect(spanElements.length).toBe(1);
        const firstSpanContent = spanElements[0].nativeElement.textContent;
        expect(firstSpanContent).toContain('Courses');
    });
});
