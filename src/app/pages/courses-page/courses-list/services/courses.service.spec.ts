import {TestBed} from '@angular/core/testing';

import {CoursesService} from './courses.service';
import {Course} from '../../course/course.model';

describe('CoursesService', () => {
    let service: CoursesService;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(CoursesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('method: getCourses', () => {
        it('should return list of courses', () => {
            const result: Course[] = service.getCourses();
            expect(result).toBeDefined();
            expect(result.length).toBe(4);
        });
    });

    describe('method: createCourse', () => {
        it('should add new course to the courses list', () => {
            const course: Course = {
                id: 'id',
                title: 'title',
                duration: 100,
                creationDate: new Date(),
                description: 'description',
                topRated: true
            };
            service.createCourse(course);
            expect(service.getCourses().length).toBe(5);
        });
    });

    describe('method: getCourseById', () => {
        it('should not return the course if course with such id does not exist', () => {
            const course: Course = service.getCourseById('not_exist');
            expect(course).toBeUndefined();
        });

        it('should return the course if course with such id exists', () => {
            const course: Course = service.getCourseById('id_1');
            expect(course).toBeDefined();
        });
    });

    describe('method: updateCourse', () => {
        it('should update the course data', () => {
            const courseToUpdate: Partial<Course> = {description: 'description'};
            service.updateCourse('id_1', courseToUpdate);
            expect(service.getCourseById('id_1').description).toBe('description');
        });

        it('should not update the course data if course does not exist', () => {
            const courseToUpdate: Partial<Course> = {description: 'description'};
            const prevCoursesList = service.getCourses();
            service.updateCourse('not exist', courseToUpdate);
            const newCoursesList = service.getCourses();
            expect(prevCoursesList).toEqual(newCoursesList);
        });
    });

    describe('method: deleteCourse', () => {
        it('should delete the course', () => {
            service.deleteCourse('id_1');
            expect(service.getCourses().length).toBe(3);
        });
    });
});
