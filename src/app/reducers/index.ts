import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import * as fromNote from '../note/store/note.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { environment } from '../../environments/environment';

export interface State {
  note: fromNote.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  note: fromNote.reducer,
  auth: fromAuth.reducer,
};
