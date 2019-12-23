import {OrderByPipe} from './order-by.pipe';
import {Course} from '../../pages/courses-page/course/course.model';

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

describe('OrderByPipe', () => {
    const pipe = new OrderByPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should sort courses by creationDate', () => {
        const result = pipe.transform(MOCK_COURSES_LIST);
        expect(result[0].date).toEqual(new Date('2019-11-11'));
        expect(result[1].date).toEqual(new Date('2011-11-11'));
        expect(result[2].date).toEqual(new Date('2009-11-11'));
    });
});
