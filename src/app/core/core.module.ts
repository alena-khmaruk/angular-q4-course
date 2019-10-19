import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {CoursesListComponent} from './components/courses-list/courses-list.component';
import {CourseComponent} from './components/course/course.component';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {SearchComponent} from './components/search/search.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        CoursesListComponent,
        CourseComponent,
        BreadcrumbComponent,
        SearchComponent,
        UserComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        CoursesListComponent,
        BreadcrumbComponent,
        SearchComponent
    ],
    imports: [
        CommonModule
    ]
})
export class CoreModule {
}
