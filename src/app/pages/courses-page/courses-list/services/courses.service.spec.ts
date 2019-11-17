import {TestBed} from '@angular/core/testing';

import {CoursesService} from './courses.service';
import {Course} from '../../course/course.model';

describe('CoursesService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: CoursesService = TestBed.get(CoursesService);
        expect(service).toBeTruthy();
    });

    describe('method: getCourses', () => {
        it('should return list of courses', () => {
            const service: CoursesService = TestBed.get(CoursesService);
            const result: Course[] = service.getCourses();
            expect(result).toBeDefined();
            expect(result.length).toBe(4);
        });
    });
});
