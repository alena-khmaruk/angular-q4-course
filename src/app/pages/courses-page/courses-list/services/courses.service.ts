import {Injectable} from '@angular/core';
import {Course} from '../../course/course.model';
import {COURSES_LIST} from '../../../../core/.courses';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private _coursesList: Set<Course> = new Set(COURSES_LIST);

    public getCourses(): Course[] {
        return [...this._coursesList];
    }

    public createCourse(item: Course): void {
        this._coursesList.add(item);
    }

    public getCourseById(id: string): Course {
        return this.getCourses().find((item: Course) => {
            return item.id === id;
        });
    }

    public updateCourse(id: string, item: Partial<Course>): void {
        const course: Course = this.getCourseById(id);
        if (course) {
            this._coursesList.delete(course);
            Object.assign(course, item);
            this._coursesList.add(course);
        }
    }

    public deleteCourse(id: string): void {
        const course: Course = this.getCourseById(id);
        this._coursesList.delete(course);
    }
}

