import {FilterByNamePipe} from './filter-by-name.pipe';
import {Course} from '../../pages/courses-page/course/course.model';

const MOCK_COURSES_LIST: Course[] = [
    {
        creationDate: new Date('2011-11-11'),
        title: 'course title test1',
        duration: 83,
        description: 'test',
        topRated: false,
        id: 'test'
    },
    {
        creationDate: new Date('2009-11-11'),
        title: 'course title test2',
        duration: 83,
        description: 'test',
        topRated: false,
        id: 'test'
    },
    {
        creationDate: new Date('2019-11-11'),
        title: 'course title test3',
        duration: 83,
        description: 'test',
        topRated: false,
        id: 'test'
    },
];

describe('FilterByNamePipe', () => {
    const pipe = new FilterByNamePipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should filter courses list by title name', () => {
        const result: Course[] = pipe.transform(MOCK_COURSES_LIST, 'test3');
        expect(result.length).toBe(1);
        expect(result[0]).toEqual(MOCK_COURSES_LIST[2]);
    });

    it('should filter courses list by title name (no courses)', () => {
        const result: Course[] = pipe.transform(MOCK_COURSES_LIST, 'none');
        expect(result.length).toBe(0);
    });
});
