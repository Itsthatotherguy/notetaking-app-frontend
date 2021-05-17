import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as NoteActions from './note.actions';
import { NoteService } from '../note.service';

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

  updateNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NoteActions.updateNoteStart),
      concatMap((action) => {
        return this.noteService
          .updateNote(action.id, action.updateNoteRequest)
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

  deleteNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NoteActions.deleteNoteStart),
      concatMap((action) => {
        return this.noteService.deleteNote(action.id).pipe(
          map((id) => {
            return NoteActions.deleteNoteSuccess({ id });
          }),
          catchError((errors: string[]) => {
            return of(NoteActions.deleteNoteFail({ errors }));
          })
        );
      })
    );
  });

  constructor(private actions$: Actions, private noteService: NoteService) {}
}
