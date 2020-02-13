import {Component, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Component({
    selector: 'vc-duration-input',
    templateUrl: './duration-input.component.html',
    styleUrls: ['./duration-input.component.scss'],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => DurationInputComponent),
          multi: true
        }
      ]
})
export class DurationInputComponent implements ControlValueAccessor {
    public duration: number;
    public isTouched = false;

    private _onChange: (a: any) => void;
    private _onTouched: () => void;

    constructor() {}

    public writeValue(duration: number): void {
        this.duration = duration;
    }

    public registerOnChange(fn: (a: any) => void): void {
        this._onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    public onChange(): void {
        this._onChange(this.duration);
    }

    public onTouch(): void {
        if (this.isTouched) {
            return;
        }

        this._onTouched();
        this.isTouched = true;
    }
}
