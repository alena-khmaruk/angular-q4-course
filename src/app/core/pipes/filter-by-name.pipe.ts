import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Course} from '../../pages/courses-page/course/course.model';

@Pipe({
    name: 'filterByName'
})
@Injectable({
    providedIn: 'root'
})
export class FilterByNamePipe implements PipeTransform {

    public transform(coursesList: Course[], filterValue: string): Course[] {
        return coursesList.filter((course: Course) => {
            return course.name.toLowerCase().includes(filterValue.toLowerCase());
        });
    }

}
