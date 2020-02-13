import {createReducer, on} from '@ngrx/store';
import {updateCoursesList, incrementOffset, decrementOffset, resetOffset, updateFilterOption} from '../actions/courses.actions';
import {Course} from '../pages/courses-page/course/course.model';

export interface CoursesState {
  list: Course[];
  offset: number;
  count: number;
  filter: string;
}

const initialState: CoursesState = {
  list: [],
  offset: 0,
  count: 10,
  filter: ''
};

const _coursesReducer = createReducer(initialState,
  on(updateCoursesList, (state: CoursesState, action: {courses: Course[]}) => {
    return {
      ...state,
      list: action.courses
    };
  }),
  on(incrementOffset, (state: CoursesState) => {
    const offset = state.offset + state.count;

    return {
      ...state,
      offset
    };
  }),
  on(decrementOffset, (state: CoursesState) => {
    const offset = state.offset - state.count;

    return {
      ...state,
      offset
    };
  }),
  on(resetOffset, (state: CoursesState) => {
    return {
      ...state,
      offset: 0
    };
  }),
  on(updateFilterOption, (state: CoursesState, action: {filter: string}) => {
    return {
      ...state,
      filter: action.filter
    };
  })
);

export function coursesReducer(state: CoursesState, action) {
  return _coursesReducer(state, action);
}
