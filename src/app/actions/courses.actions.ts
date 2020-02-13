import {createAction, props} from '@ngrx/store';

import {Course} from '../pages/courses-page/course/course.model';

export const updateCoursesList = createAction('[Courses List Component] updateCoursesList', props<{courses: Course[]}>());
export const incrementOffset = createAction('[Courses List Component] incrementOffset');
export const decrementOffset = createAction('[Courses List Component] decrementOffset');
export const resetOffset = createAction('[Courses List Component] resetOffset');
export const updateFilterOption = createAction('[Courses List Component] updateFilteOption', props<{filter: string}>());
