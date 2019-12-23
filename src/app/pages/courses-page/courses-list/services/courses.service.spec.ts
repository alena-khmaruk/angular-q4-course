import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {CoursesService} from './courses.service';
import {Course} from '../../course/course.model';

const MOCK_COURSES_LIST: Course[] = [
    {
        date: new Date('2011-11-11'),
        name: 'course title test1',
        length: 83,
        description: 'test',
        isTopRated: false,
        id: 1
    },
    {
        date: new Date('2009-11-11'),
        name: 'course title test2',
        length: 83,
        description: 'test',
        isTopRated: false,
        id: 2
    },
    {
        date: new Date('2019-11-11'),
        name: 'course title test3',
        length: 83,
        description: 'test',
        isTopRated: false,
        id: 3
    },
];

describe('CoursesService', () => {
    let service: CoursesService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.get(CoursesService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('method: getCourses', () => {
        it('should call http.get method with /courses url with parameters', (done) => {
            service.getCourses({start: '0', count: '10'})
                .subscribe(res => {
                    expect(res).toEqual(
                        MOCK_COURSES_LIST
                    );
                    done();
                });

            const getCoursesReq = httpMock.expectOne('/courses?start=0&count=10');
            getCoursesReq.flush(MOCK_COURSES_LIST);

            httpMock.verify();
        });
    });

    describe('method: createCourse', () => {
        it('should call http.post method with /courses url and course in the body', (done) => {
            service.createCourse(MOCK_COURSES_LIST[0]).subscribe(res => {
                expect(res).toEqual(
                    MOCK_COURSES_LIST[0]
                );
                done();
            });

            const createCourseReq = httpMock.expectOne('/courses');
            expect(createCourseReq.request.method).toBe('POST');
            expect(createCourseReq.request.body).toEqual(MOCK_COURSES_LIST[0]);
            createCourseReq.flush(MOCK_COURSES_LIST[0]);

            httpMock.verify();
        });
    });

    describe('method: getCourseById', () => {
        it('should call http.get method with /courses/{id} url', (done) => {
            service.getCourseById(1).subscribe(res => {
                expect(res).toEqual(
                    MOCK_COURSES_LIST[0]
                );
                done();
            });

            const getCourseReq = httpMock.expectOne('/courses/1');
            expect(getCourseReq.request.method).toBe('GET');
            getCourseReq.flush(MOCK_COURSES_LIST[0]);

            httpMock.verify();
        });
    });

    describe('method: updateCourse', () => {
        it('should call http.path method with /courses/{id} url and course', (done) => {
            service.updateCourse(MOCK_COURSES_LIST[0]).subscribe(res => {
                expect(res).toEqual(
                    MOCK_COURSES_LIST[0]
                );
                done();
            });

            const updateCourseReq = httpMock.expectOne('/courses/1');
            expect(updateCourseReq.request.method).toBe('PATCH');
            expect(updateCourseReq.request.body).toBe(MOCK_COURSES_LIST[0]);
            updateCourseReq.flush(MOCK_COURSES_LIST[0]);

            httpMock.verify();
        });
    });

    describe('method: deleteCourse', () => {
        it('should call http.delete method with /courses/{id} url', () => {
            service.deleteCourse(1);

            const deleteCourseReq = httpMock.expectOne('/courses/1');
            expect(deleteCourseReq.request.method).toBe('DELETE');
            deleteCourseReq.flush(MOCK_COURSES_LIST[0]);

            httpMock.verify();
        });
    });
});
