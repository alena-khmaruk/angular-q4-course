import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {UserComponent} from './user.component';
import {User} from "./user.model";

describe('UserComponent', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
        component.user = new User('Alena', 'Khmaruk');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set up user data on component init', () => {
        expect(component.user.id).toBe('Alena_Khmaruk');
        expect(component.user.firstName).toBe('Alena');
        expect(component.user.lastName).toBe('Khmaruk');
    });

    it('should display full user name', () => {
        const fullNameElement = fixture.debugElement.query(By.css('.vc-user__name')).nativeElement;
        expect(fullNameElement.textContent).toEqual('Alena Khmaruk');
    });
});
