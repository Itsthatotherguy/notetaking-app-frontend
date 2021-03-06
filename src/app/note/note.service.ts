import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AddNoteRequest } from './dto/add-note.request';
import { Note } from './store/note.models';
import { UpdateNoteRequest } from './dto/update-note.request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { DeleteNoteResponse } from './dto/delete-note.response';

@Injectable({ providedIn: 'root' })
export class NoteService {
  constructor(private httpClient: HttpClient) {}

  public fetchNotes(): Observable<Note[]> {
    return this.httpClient
      .get<Note[]>('note')
      .pipe(catchError(this.handleErrorMessages.bind(this)));
  }

  public addNote(addNoteRequest: AddNoteRequest): Observable<Note> {
    return this.httpClient.post<Note>('note', addNoteRequest).pipe(
      tap(() => {
        this;
      }),
      catchError(this.handleErrorMessages.bind(this))
    );
  }

  public updateNote(
    id: string,
    updateNoteRequest: UpdateNoteRequest
  ): Observable<Note> {
    return this.httpClient
      .patch<Note>(`note/${id}`, updateNoteRequest)
      .pipe(catchError(this.handleErrorMessages.bind(this)));
  }

  public deleteNote(id: string): Observable<DeleteNoteResponse> {
    return this.httpClient
      .delete<DeleteNoteResponse>(`note/${id}`)
      .pipe(catchError(this.handleErrorMessages.bind(this)));
  }

  private handleErrorMessages(
    errorResponse: HttpErrorResponse
  ): Observable<never> {
    console.log(errorResponse);
    let errorMessages: string[] = [
      'An unknown error has occurred. Please try again in a while.',
    ];

    if (!errorResponse.error || !errorResponse.error.message) {
      return throwError(errorMessages);
    }

    if (Array.isArray(errorResponse.error.message)) {
      const messages = errorResponse.error.message;

      errorMessages = messages.map((errorMessageResponse) =>
        this.determineErrorMessage(errorMessageResponse)
      );
    } else {
      const message = errorResponse.error.message;

      errorMessages = [this.determineErrorMessage(message)];
    }

    return throwError(errorMessages);
  }

  private determineErrorMessage(errorResponseMessage: string): string {
    enum NoteErrors {
      MISSING_ID = 'MISSING_ID',
      MISSING_TITLE = 'MISSING_TITLE',
      MISSING_BODY = 'MISSING_BODY',
      NOTE_NOT_FOUND = 'NOTE_NOT_FOUND',
    }

    switch (errorResponseMessage) {
      case NoteErrors.MISSING_TITLE:
        return 'Please provide a title for the note.';
      case NoteErrors.MISSING_BODY:
        return 'Please provide a body for the note.';
      case NoteErrors.MISSING_ID:
        return 'Please provide an ID.';
      case NoteErrors.NOTE_NOT_FOUND:
        return 'No note found';
      default:
        return 'Something unexpected happened. Please try again later.';
    }
  }
}
