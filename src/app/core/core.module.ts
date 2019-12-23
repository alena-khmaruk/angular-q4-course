import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimePipe} from './pipes/time.pipe';
import {CoursePlateBorderDirective} from './directives/course-plate-border.directive';
import {OrderByPipe} from './pipes/order-by.pipe';
import {FilterByNamePipe} from './pipes/filter-by-name.pipe';

@NgModule({
    declarations: [
        TimePipe,
        CoursePlateBorderDirective,
        OrderByPipe,
        FilterByNamePipe
    ],
    exports: [
        TimePipe,
        CoursePlateBorderDirective,
        OrderByPipe
    ],
    imports: [
        CommonModule
    ]
})
export class CoreModule {
}
