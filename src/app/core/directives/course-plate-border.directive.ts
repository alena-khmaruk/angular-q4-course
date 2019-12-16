import {Directive, ElementRef, Input, OnInit} from '@angular/core';

const MS_IN_DAY: number = 24 * 60 * 60 * 1000;

@Directive({
    selector: '[vcCoursePlateBorder]'
})
export class CoursePlateBorderDirective implements OnInit {
    @Input('vcCoursePlateBorder') public dateCreation: string;

    constructor(private element: ElementRef) {
    }

    public ngOnInit(): void {
        const currentDate: Date = new Date();
        const dateCreation: Date = new Date(this.dateCreation);
        const msIn14Days: number = 14 * MS_IN_DAY;
        const difference: number = currentDate.getTime() - dateCreation.getTime();
        if (difference < 0) {
            this.element.nativeElement.style.border = '1px solid #577ce6';
        } else if (difference >= 0 && difference <= msIn14Days) {
            this.element.nativeElement.style.border = '1px solid #9bc837';
        }
    }

}
