import {Pipe, PipeTransform} from '@angular/core';
import {Course} from '../../pages/courses-page/course/course.model';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

    public transform(coursesList: Course[]): any {
        return coursesList.sort((prev, next) => {
            return next.date.getTime() - prev.date.getTime();
        });
    }

}
