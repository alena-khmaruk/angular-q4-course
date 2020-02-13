import {createAction, props} from '@ngrx/store';

import {Course} from '../pages/courses-page/course/course.model';

export const updateName = createAction('[Course Component] updateName', props<{name: string}>());
export const updateDescription = createAction('[Course Component] udateDescription', props<{description: string}>());
export const updateLength = createAction('[Course Component] updateLength', props<{length: number}>());
export const updateDate = createAction('[Course Component] updateDate', props<{date: Date}>());
export const updateCourse = createAction('[Course Component] updateCourse', props<{course: Course}>());
