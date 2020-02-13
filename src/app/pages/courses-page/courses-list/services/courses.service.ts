import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Course} from '../../course/course.model';
import {Author} from 'src/app/pages/course-item-page/author-input/author-input.component';


export interface IFilterParams {
    start: string;
    count: string;
    sort: string;
    filter: string;
    textFragment: string;
}

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    constructor(
        private http: HttpClient
    ) {}

    public getCourses(params?: Partial<IFilterParams>): Observable<Course[]> {
        return this.http.get<Course[]>('/courses', {params});
    }

    public getAuthors(): Observable<Author[]> {
        return this.http.get<Author[]>('/authors');
    }

    public createCourse(item: Course): Observable<Course> {
        return this.http.post<Course>('/courses', item);
    }

    public getCourseById(id: number): Observable<Course> {
        return this.http.get<Course>(`/courses/${id}`);
    }

    public updateCourse(item: Course): Observable<Course> {
        return this.http.patch<Course>(`/courses/${item.id}`, item);
    }

    public deleteCourse(id: number): void {
        this.http.delete(`/courses/${id}`).subscribe(() => {});
    }
}

