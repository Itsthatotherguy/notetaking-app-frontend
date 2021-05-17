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

export const addNoteStart = createAction(
  '[Note] Add Note Start',
  props<{ addNoteRequest: AddNoteRequest }>()
);

export const addNoteSuccess = createAction(
  '[Note] Add Note Success',
  props<{ note: Note }>()
);

export const updateNoteStart = createAction(
  '[Note] Update Note Start',
  props<{ id: string; updateNoteRequest: UpdateNoteRequest }>()
);

export const updateNoteSuccess = createAction(
  '[Note] Update Note Success',
  props<{ note: Update<Note> }>()
);

export const deleteNoteStart = createAction(
  '[Note] Delete Note Start',
  props<{ id: string }>()
);

export const deleteNoteSuccess = createAction(
  '[Note] Delete Note Success',
  props<{ id: string }>()
);
