import { createSelector } from 'reselect';
import { StateSchema } from '../../../../app/providers/StoreProvider';

export const getScrollSave = (state: StateSchema) => state.scrollSave.scroll;
export const getScrollSaveByPath = createSelector(
    getScrollSave,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
