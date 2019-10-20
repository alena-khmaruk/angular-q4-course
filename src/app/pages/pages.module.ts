import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursesPageComponent} from './coursesPage/coursesPage.component';
import {CoreModule} from '../core/core.module';
import {CoursesListComponent} from './coursesPage/courses-list/courses-list.component';
import {CourseComponent} from './coursesPage/course/course.component';
import {SearchComponent} from './coursesPage/search/search.component';

@NgModule({
    declarations: [
        CoursesPageComponent,
        CoursesListComponent,
        CourseComponent,
        SearchComponent
    ],
    exports: [CoursesPageComponent],
    imports: [
        CommonModule,
        CoreModule
    ]
})
export class PagesModule {
}
