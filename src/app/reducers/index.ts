import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import * as fromNote from '../note/store/note.reducer';
import { environment } from '../../environments/environment';

export interface State {
  note: fromNote.State;
}

export const reducers: ActionReducerMap<State> = {
  note: fromNote.reducer,
};
