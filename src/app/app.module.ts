import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppComponent} from './app.component';
import {CoursesPageComponent} from './pages/courses-page/courses-page.component';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {PagesModule} from './pages/pages.module';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {CourseItemPageComponent} from './pages/course-item-page/course-item-page.component';
import {AuthGuard} from './guards/auth.guard';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {DomainInterceptor} from './interceptors/domain.interceptor';
import {coursesReducer, CoursesState} from './reducers/courses.reducer';
import {authReducer, AuthState} from './reducers/auth.reducer';
import { courseItemReducer } from './reducers/courseItem.reducer';

export interface AppState {
    courses: CoursesState;
    auth: AuthState;
}

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/courses',
        pathMatch: 'full'
    },
    {
        path: 'courses',
        component: CoursesPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'courses/new',
        component: CourseItemPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'courses/:id',
        component: CourseItemPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: NotFoundPageComponent
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            // {enableTracing: true}
        ),
        BrowserModule,
        CoreModule,
        SharedModule,
        PagesModule,
        RouterModule,
        HttpClientModule,
        StoreModule.forRoot({
            courses: coursesReducer,
            auth: authReducer,
            courseItem: courseItemReducer
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 10
        })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DomainInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
