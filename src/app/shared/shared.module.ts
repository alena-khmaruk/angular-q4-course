import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {UserComponent} from './components/user/user.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        BreadcrumbComponent,
        UserComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        BreadcrumbComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule {
}
