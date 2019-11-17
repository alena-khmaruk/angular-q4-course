import {TimePipe} from './time.pipe';

describe('TimePipe', () => {
    const pipe = new TimePipe();

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should transform 105 minutes to "1h 45min" string', () => {
        expect(pipe.transform(105)).toBe('1h 45min');
    });

    it('should transform 32 minutes to "32min" string', () => {
        expect(pipe.transform(32)).toBe('32min');
    });
});
