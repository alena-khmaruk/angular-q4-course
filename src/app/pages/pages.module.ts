import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CoursesComponent } from './courses/courses/courses.component';
import {CoreModule} from '../core/core.module';

@NgModule({
    declarations: [CoursesComponent],
    exports: [CoursesComponent],
    imports: [
        CommonModule,
        CoreModule
    ]
})
export class PagesModule {
}
