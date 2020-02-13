import * as moment from 'moment';
import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, FormControl} from '@angular/forms';

interface InputField {
    value: number;
    touched: boolean;
}

@Component({
    selector: 'vc-date-input',
    templateUrl: './date-input.component.html',
    styleUrls: ['./date-input.component.scss'],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => DateInputComponent),
          multi: true
        },
        {
          provide: NG_VALIDATORS,
          useExisting: forwardRef(() => DateInputComponent),
          multi: true,
        }
      ]
})
export class DateInputComponent implements ControlValueAccessor, Validator {
    public date: string;
    public day: InputField = {value: null, touched: false};
    public month: InputField = {value: null, touched: false};
    public year: InputField = {value: null, touched: false};
    public isTouched = false;
    public isValid = false;

    private _onChange: (a: any) => void;
    private _onTouched: () => void;

    constructor() {}

    public writeValue(date: string): void {
        if (!date) {
            return;
        }
        const dateToRecord = moment(date, 'DD/MM/YYYY');
        this.day.value = dateToRecord.date();
        this.day.touched = true;
        this.month.value = dateToRecord.month() + 1;
        this.month.touched = true;
        this.year.value = dateToRecord.year();
        this.year.touched = true;
        this.date = this._generateDate();
    }

    public registerOnChange(fn: () => void): void {
        this._onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    public validate(c: FormControl) {
        if (this._isDateValid()) {
            return;
        }
        return {
            dateValidity: true,
        };
    }

    public onChange(): void {
        if (this.day.value && this.month.value && this.year.value) {
            this.date = this._generateDate();
            this._onChange(this.date);
        } else if (this.date) {
            this.date = null;
            this._onChange(null);
        }
    }

    public onTouch(inputName: string): void {
        if (this.isTouched) {
            return;
        }

        switch (inputName) {
            case 'day': {
                this.day.touched = true;
                break;
            }
            case 'month': {
                this.month.touched = true;
                break;
            }
            case 'year': {
                this.year.touched = true;
                break;
            }
            default: {
                break;
            }
        }

        if (this.day.touched && this.year.touched && this.month.touched) {
            this._onTouched();
            this.isTouched = true;
        }
    }

    private _isDateValid(): boolean {
        this.isValid = moment(this.date, 'DD/MM/YYYY', true).isValid();
        return this.isValid;
    }

    private _generateDate(): string {
        const formattedDay = this.day.value <= 9 ? `0${this.day.value}` : this.day.value;
        const formattedMonth = this.month.value <= 9 ? `0${this.month.value}` : this.month.value;
        return `${formattedDay}/${formattedMonth}/${this.year.value}`;
    }
}
