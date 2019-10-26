import {Pipe, PipeTransform} from '@angular/core';

const MINUTES_IN_HOURS = 60;

@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {
    transform(minutes: number): any {
        const hours = Math.floor(minutes / MINUTES_IN_HOURS);
        const lastMinutes = minutes % MINUTES_IN_HOURS;
        return `${hours}h ${lastMinutes}m`;
    }

}
