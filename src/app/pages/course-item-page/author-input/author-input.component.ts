import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CoursesService } from '../../courses-page/courses-list/services/courses.service';

export interface Author {
  id: number;
  name: string;
}

@Component({
    selector: 'vc-author-input',
    templateUrl: './author-input.component.html',
    styleUrls: ['./author-input.component.scss'],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AuthorInputComponent),
        multi: true
      }
  ]
})
export class AuthorInputComponent implements ControlValueAccessor {
  public authors: Author[] = [];
  public suggestedAuthors: Author[] = [];
  public searchLine: string;
  public isTouched = false;
  private authorsList: Author[] = [];

  private _onChange: (a: any) => void;
  private _onTouched: () => void;

  constructor(private courses: CoursesService) {
    courses.getAuthors().subscribe((authors: Author[]) => {
      this.authorsList = authors;
    });
  }

  public writeValue(authors: Author[]): void {
    this.authors = authors || [];
  }

  public registerOnChange(fn: (a: any) => void): void {
      this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
      this._onTouched = fn;
  }

  public onTouch(): void {
      if (this.isTouched) {
        return;
      }

      this._onTouched();
      this.isTouched = true;
  }

  public filterAuthors(): void {
    if (!this.searchLine) {
      this.suggestedAuthors = [];
      return;
    }
    this.suggestedAuthors = this.authorsList
      .filter((author: Author) => author.name.includes(this.searchLine))
      .slice(0, 5);
  }

  public addAuthor(author: Author): void {
    const isAuthorExist = this.authors.find((item: Author) => item.id === author.id);
    if (!isAuthorExist) {
      this.authors.push(author);
      this._onChange(this.authors);
      this.searchLine = '';
      this.filterAuthors();
    }
  }

  public removeAuthor(author: Author): void {
    const index = this.authors.indexOf(author);

    if (index === -1) {
      return;
    }
    this.authors.splice(index, 1);

    if (this.authors.length) {
      this._onChange(this.authors);
    } else {
      this._onChange(null);
    }
  }
}
