import {Pipe, PipeTransform} from '@angular/core';

const MINUTES_IN_HOURS = 60;

@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {
    public transform(minutes: number): string {
        if (minutes < MINUTES_IN_HOURS) {
            return `${minutes}m`;
        }
        const hours: number = Math.floor(minutes / MINUTES_IN_HOURS);
        const lastMinutes: number = minutes % MINUTES_IN_HOURS;
        return `${hours}h ${lastMinutes}m`;
    }

}
