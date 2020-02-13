import {createReducer, on} from '@ngrx/store';

import {updateName, updateDescription, updateLength, updateDate, updateCourse} from '../actions/courseItem.actions';
import {Course} from '../pages/courses-page/course/course.model';

export interface CourseItemState {
  id: number;
  name: string;
  description: string;
  length: number;
  date: Date;
  isTopRated: boolean;
}

const initialState: CourseItemState = {
  id: 0,
  name: '',
  description: '',
  length: 0,
  date: new Date(),
  isTopRated: false
};

const _courseItemReducer = createReducer(
  initialState,
  on(updateName, (state: CourseItemState, action: {name: string}) => {
    return {
      ...state,
      name: action.name
    };
  }),
  on(updateDescription, (state: CourseItemState, action: {description: string}) => {
    return {
      ...state,
      description: action.description
    };
  }),
  on(updateLength, (state: CourseItemState, action: {length: number}) => {
    return {
      ...state,
      length: action.length
    };
  }),
  on(updateDate, (state: CourseItemState, action: {date: Date}) => {
    return {
      ...state,
      date: action.date
    };
  }),
  on(updateCourse, (state: CourseItemState, action: {course: Course}) => {
    if (!action.course) {
      return state;
    }
    return {
      ...state,
      name: action.course.name,
      description: action.course.description,
      length: action.course.length,
      date: action.course.date,
      id: action.course.id,
      isTopRated: action.course.isTopRated
    };
  })
);

export function courseItemReducer(state: CourseItemState, action) {
  return _courseItemReducer(state, action);
}
