import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { AddNoteRequest } from '../dto/add-note.request';
import { UpdateNoteRequest } from '../dto/update-note.request';
import { Note } from './note.models';

export const loadNotesStart = createAction('[Note] Load Notes Start');

export const loadNotesSuccess = createAction(
  '[Note] Load Notes Success',
  props<{ notes: Note[] }>()
);

export const loadNotesFail = createAction(
  '[Note] Load Notes Fail',
  props<{ errors: string[] }>()
);

export const addNoteStart = createAction(
  '[Note] Add Note Start',
  props<{ addNoteRequest: AddNoteRequest }>()
);

export const addNoteSuccess = createAction(
  '[Note] Add Note Success',
  props<{ note: Note }>()
);

export const addNoteFail = createAction(
  '[Note] Add Note Fail',
  props<{ errors: string[] }>()
);

export const updateNoteStart = createAction(
  '[Note] Update Note Start',
  props<{ updateNoteRequest: UpdateNoteRequest }>()
);

export const updateNoteSuccess = createAction(
  '[Note] Update Note Success',
  props<{ note: Update<Note> }>()
);

export const updateNoteFail = createAction(
  '[Note] Update Note Fail',
  props<{ errors: string[] }>()
);

export const deleteNoteStart = createAction(
  '[Note] Delete Note Start',
  props<{ id: string }>()
);

export const deleteNoteSuccess = createAction(
  '[Note] Delete Note Success',
  props<{ id: string }>()
);

export const deleteNoteFail = createAction(
  '[Note] Delete Note Fail',
  props<{ errors: string[] }>()
);

export const openCreateNoteModal = createAction(
  '[Note] Open Create Note Modal'
);

export const closeCreateNoteModal = createAction(
  '[Note] Close Create Note Modal'
);

export const openUpdateNoteModal = createAction(
  '[Note] Open Update Note Modal',
  props<{ id: string }>()
);

export const closeUpdateNoteModal = createAction(
  '[Note] Close Update Note Modal'
);
