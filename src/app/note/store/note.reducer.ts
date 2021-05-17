import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as NoteActions from './note.actions';
import { Note } from './note.models';

export const noteFeatureKey = 'note';

export interface State extends EntityState<Note> {
  isFetchingNotes: boolean;
  isAddingNote: boolean;
  isUpdatingNote: boolean;
  isDeletingNote: boolean;
  errorsFetchingNotes: string[];
  errorsAddingNote: string[];
  errorsUpdatingNote: string[];
  errorsDeletingNote: string[];
}

const sortByCreatedAt = (a: Note, b: Note): number => {
  if (a.createdAt < b.createdAt) {
    return 1;
  } else if (a.createdAt > b.createdAt) {
    return -1;
  } else {
    return 0;
  }
};

export const adapter = createEntityAdapter<Note>({
  sortComparer: sortByCreatedAt,
});

export const initialState = adapter.getInitialState({
  isFetchingNotes: false,
  isAddingNote: false,
  isUpdatingNote: false,
  isDeletingNote: false,
  errorsFetchingNotes: null,
  errorsAddingNote: null,
  errorsUpdatingNote: null,
  errorsDeletingNote: null,
});

export const reducer = createReducer(
  initialState,

  on(NoteActions.loadNotesStart, (state) => {
    return {
      ...state,
      isFetchingNotes: true,
      errorsFetchingNotes: null,
    };
  }),

  on(NoteActions.loadNotesSuccess, (state, { notes }) => {
    return {
      ...state,
      isFetchingNotes: false,
      notes,
    };
  }),

  on(NoteActions.addNoteStart, (state) => {
    return {
      ...state,
      isAddingNote: true,
      errorsAddingNote: null,
    };
  }),

  on(NoteActions.addNoteSuccess, (state, { note }) => {
    return adapter.addOne(note, {
      ...state,
      isAddingNote: false,
    });
  }),

  on(NoteActions.updateNoteStart, (state) => {
    return {
      ...state,
      isUpdatingNote: false,
      errorsUpdatingNote: null,
    };
  }),

  on(NoteActions.updateNoteSuccess, (state, { note }) => {
    return adapter.updateOne(note, {
      ...state,
      isUpdatingNote: false,
    });
  }),

  on(NoteActions.deleteNoteStart, (state) => {
    return {
      ...state,
      isDeletingNote: true,
      errorsDeletingNote: null,
    };
  }),

  on(NoteActions.deleteNoteSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  })
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
