import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursesListComponent} from './components/courses-list/courses-list.component';
import {CourseComponent} from './components/course/course.component';
import {SearchComponent} from './components/search/search.component';

@NgModule({
    declarations: [
        CoursesListComponent,
        CourseComponent,
        SearchComponent
    ],
    exports: [
        CoursesListComponent,
        SearchComponent
    ],
    imports: [
        CommonModule
    ]
})
export class CoreModule {
}
