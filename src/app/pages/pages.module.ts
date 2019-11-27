import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';
import {CoursesPageComponent} from './courses-page/courses-page.component';
import {CoursesListComponent} from './courses-page/courses-list/courses-list.component';
import {CourseComponent} from './courses-page/course/course.component';
import {SearchComponent} from './courses-page/search/search.component';
import {AddCourseComponent} from './courses-page/add-course/add-course.component';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {CourseItemPageComponent} from './course-item-page/course-item-page.component';
import { CourseFormComponent } from './course-item-page/course-form/course-form.component';
import { DurationInputComponent } from './course-item-page/duration-input/duration-input.component';
import { DateInputComponent } from './course-item-page/date-input/date-input.component';

@NgModule({
    declarations: [
        CoursesPageComponent,
        CoursesListComponent,
        CourseComponent,
        SearchComponent,
        AddCourseComponent,
        NotFoundPageComponent,
        LoginPageComponent,
        CourseItemPageComponent,
        CourseFormComponent,
        DurationInputComponent,
        DateInputComponent
    ],
    exports: [CoursesPageComponent],
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        SharedModule,
        RouterModule
    ]
})
export class PagesModule {}
