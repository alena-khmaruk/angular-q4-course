import {Injectable} from '@angular/core';
import {Course} from '../../course/course.model';
import {COURSES_LIST} from '../../../../core/.courses';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    getCourses(): Course[] {
        return COURSES_LIST;
    }
}

