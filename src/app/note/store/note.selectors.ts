import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNote from './note.reducer';
import * as fromApp from '../../reducers/index';
import * as dayjs from 'dayjs';

export const selectNoteState = createFeatureSelector<
  fromApp.State,
  fromNote.State
>(fromNote.noteFeatureKey);

export const selectIsLoading = createSelector(
  selectNoteState,
  (state) => state.isLoading
);

export const selectNotes = createSelector(selectNoteState, (state) => {
  const notes = fromNote.selectAll(state);

  return notes.map((note) => ({
    ...note,
    createdAt: dayjs(note.createdAt).format('dddd, D MMMM YYYY, HH:mm'),
  }));
});

export const selectErrors = createSelector(
  selectNoteState,
  (state) => state.errors
);

export const selectNoteEntities = createSelector(selectNoteState, (state) =>
  fromNote.selectEntities(state)
);

export const selectEditingNoteId = createSelector(
  selectNoteState,
  (state) => state.editingNoteId
);

export const selectEditingNote = createSelector(
  selectEditingNoteId,
  selectNoteEntities,
  (editingNoteId, noteEntities) => noteEntities[editingNoteId]
);

export const selectIsNoteModalOpen = createSelector(
  selectNoteState,
  (state) => state.isCreateNoteModalOpen
);
