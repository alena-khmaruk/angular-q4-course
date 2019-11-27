import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {CoursesPageComponent} from './pages/courses-page/courses-page.component';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {PagesModule} from './pages/pages.module';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {CourseItemPageComponent} from './pages/course-item-page/course-item-page.component';

const appRoutes: Routes = [
    {
        path: 'courses',
        component: CoursesPageComponent,
        data: {
            breadcrumbs: ['Courses']
        }
    },
    {
        path: 'login',
        component: LoginPageComponent,
        data: {
            breadcrumbs: []
        }
    },
    {
        path: 'new',
        component: CourseItemPageComponent,
        data: {
            breadcrumbs: ['Courses', 'New']
        }
    },
    {
        path: '',
        redirectTo: '/courses',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundPageComponent,
        data: {
            breadcrumbs: []
        }

    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true }
        ),
        BrowserModule,
        CoreModule,
        SharedModule,
        PagesModule,
        RouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
