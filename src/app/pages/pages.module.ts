import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursesPageComponent} from './courses-page/courses-page.component';
import {CoreModule} from '../core/core.module';
import {CoursesListComponent} from './courses-page/courses-list/courses-list.component';
import {CourseComponent} from './courses-page/course/course.component';
import {SearchComponent} from './courses-page/search/search.component';
import {FormsModule} from '@angular/forms';
import {AddCourseComponent} from './courses-page/add-course/add-course.component';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';

@NgModule({
    declarations: [
        CoursesPageComponent,
        CoursesListComponent,
        CourseComponent,
        SearchComponent,
        AddCourseComponent,
        NotFoundPageComponent
    ],
    exports: [CoursesPageComponent],
    imports: [
        CommonModule,
        CoreModule,
        FormsModule
    ]
})
export class PagesModule {
}
