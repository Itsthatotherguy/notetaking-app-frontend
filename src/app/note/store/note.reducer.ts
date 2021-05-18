import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as NoteActions from './note.actions';
import { Note } from './note.models';

export const noteFeatureKey = 'note';

export interface State extends EntityState<Note> {
  isLoading: boolean;
  errors: string[];
  editingNoteId: string;
  isCreateNoteModalOpen: boolean;
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
  isLoading: false,
  errors: null,
  editingNoteId: null,
  isCreateNoteModalOpen: false,
});

export const reducer = createReducer(
  initialState,

  on(NoteActions.loadNotesStart, (state) => {
    return {
      ...state,
      isLoading: true,
      errors: null,
    };
  }),

  on(NoteActions.loadNotesSuccess, (state, { notes }) => {
    return adapter.setAll(notes, {
      ...state,
      isLoading: false,
    });
  }),

  on(NoteActions.loadNotesFail, (state, { errors }) => {
    return {
      ...state,
      isLoading: false,
      errors,
    };
  }),

  on(NoteActions.addNoteStart, (state) => {
    return {
      ...state,
      isLoading: true,
      errors: null,
    };
  }),

  on(NoteActions.addNoteSuccess, (state, { note }) => {
    return adapter.addOne(note, {
      ...state,
      isLoading: false,
      isCreateNoteModalOpen: false,
      editingNoteId: null,
    });
  }),

  on(NoteActions.addNoteFail, (state, { errors }) => {
    return {
      ...state,
      isLoading: false,
      errors,
      isCreateNoteModalOpen: false,
      editingNoteId: null,
    };
  }),

  on(NoteActions.updateNoteStart, (state) => {
    return {
      ...state,
      isLoading: true,
      errors: null,
    };
  }),

  on(NoteActions.updateNoteSuccess, (state, { note }) => {
    return adapter.updateOne(note, {
      ...state,
      isLoading: false,
      isCreateNoteModalOpen: false,
      editingNoteId: null,
    });
  }),

  on(NoteActions.updateNoteFail, (state, { errors }) => {
    return {
      ...state,
      isLoading: false,
      errors,
      isCreateNoteModalOpen: false,
      editingNoteId: null,
    };
  }),

  on(NoteActions.deleteNoteStart, (state) => {
    return {
      ...state,
      isLoading: true,
      errors: null,
    };
  }),

  on(NoteActions.deleteNoteSuccess, (state, { id }) => {
    return adapter.removeOne(id, {
      ...state,
      isLoading: false,
    });
  }),

  on(NoteActions.deleteNoteFail, (state, { errors }) => {
    return {
      ...state,
      isLoading: false,
      errors,
    };
  }),

  on(NoteActions.openCreateNoteModal, (state) => {
    return {
      ...state,
      isCreateNoteModalOpen: true,
    };
  }),

  on(NoteActions.closeCreateNoteModal, (state) => {
    return {
      ...state,
      isCreateNoteModalOpen: false,
    };
  }),

  on(NoteActions.openUpdateNoteModal, (state, { id }) => {
    return {
      ...state,
      isCreateNoteModalOpen: true,
      editingNoteId: id,
    };
  }),

  on(NoteActions.closeUpdateNoteModal, (state) => {
    return {
      ...state,
      isCreateNoteModalOpen: false,
      editingNoteId: null,
    };
  })
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
