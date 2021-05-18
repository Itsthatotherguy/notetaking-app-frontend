import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';

import {
  catchError,
  concatMap,
  map,
  mergeMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';

import * as NoteActions from './note.actions';
import * as NoteSelectors from './note.selectors';
import { NoteService } from '../note.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { select, Store } from '@ngrx/store';

@Injectable()
export class NoteEffects {
  loadNotes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NoteActions.loadNotesStart),
      concatMap(() => {
        return this.noteService.fetchNotes().pipe(
          map((notes) => {
            return NoteActions.loadNotesSuccess({ notes });
          }),
          catchError((errors: string[]) => {
            return of(NoteActions.loadNotesFail({ errors }));
          })
        );
      })
    );
  });

  addNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NoteActions.addNoteStart),
      concatMap((action) => {
        return this.noteService.addNote(action.addNoteRequest).pipe(
          map((note) => {
            return NoteActions.addNoteSuccess({ note });
          }),
          catchError((errors: string[]) => {
            return of(NoteActions.addNoteFail({ errors }));
          })
        );
      })
    );
  });

  addNoteSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(NoteActions.addNoteSuccess),
        tap(() => {
          this.message.success('Note successfully added.');
        })
      );
    },
    { dispatch: false }
  );

  updateNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NoteActions.updateNoteStart),
      withLatestFrom(
        this.store.pipe(select(NoteSelectors.selectEditingNoteId))
      ),
      concatMap(([action, editingNoteId]) => {
        return this.noteService
          .updateNote(editingNoteId, action.updateNoteRequest)
          .pipe(
            map((note) => {
              return NoteActions.updateNoteSuccess({
                note: {
                  id: note.id,
                  changes: { ...note },
                },
              });
            }),
            catchError((errors: string[]) => {
              return of(NoteActions.updateNoteFail({ errors }));
            })
          );
      })
    );
  });

  updateNoteBodySuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(NoteActions.updateNoteSuccess),
        tap(() => {
          this.message.success('Note successfully updated.');
        })
      );
    },
    { dispatch: false }
  );

  deleteNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NoteActions.deleteNoteStart),
      concatMap((action) => {
        return this.noteService.deleteNote(action.id).pipe(
          map(({ id }) => {
            return NoteActions.deleteNoteSuccess({ id });
          }),
          catchError((errors: string[]) => {
            return of(NoteActions.deleteNoteFail({ errors }));
          })
        );
      })
    );
  });

  deleteNoteSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(NoteActions.deleteNoteSuccess),
        tap(() => {
          this.message.success('Note successfully deleted.');
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private noteService: NoteService,
    private message: NzMessageService,
    private store: Store
  ) {}
}
