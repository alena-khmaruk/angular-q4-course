import {OrderByPipe} from './order-by.pipe';
import {Course} from '../../pages/courses-page/course/course.model';

const MOCK_COURSES_LIST: Course[] = [
    {
        creationDate: new Date('2011-11-11'),
        title: 'test',
        duration: 83,
        description: 'test',
        topRated: false,
        id: 'test'
    },
    {
        creationDate: new Date('2009-11-11'),
        title: 'test',
        duration: 83,
        description: 'test',
        topRated: false,
        id: 'test'
    },
    {
        creationDate: new Date('2019-11-11'),
        title: 'test',
        duration: 83,
        description: 'test',
        topRated: false,
        id: 'test'
    },
];

describe('OrderByPipe', () => {
    const pipe = new OrderByPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should sort courses by creationDate', () => {
        const result = pipe.transform(MOCK_COURSES_LIST);
        expect(result[0].creationDate).toEqual(new Date('2019-11-11'));
        expect(result[1].creationDate).toEqual(new Date('2011-11-11'));
        expect(result[2].creationDate).toEqual(new Date('2009-11-11'));
    });
});
