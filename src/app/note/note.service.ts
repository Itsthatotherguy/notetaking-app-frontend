import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AddNoteRequest } from './dto/add-note.request';
import { Note } from './store/note.models';
import { v4 as uuid } from 'uuid';
import { UpdateNoteRequest } from './dto/update-note.request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private notes: Note[] = [];

  constructor(private httpClient: HttpClient) {}

  public fetchNotes(): Observable<Note[]> {
    return this.httpClient
      .get<Note[]>('note')
      .pipe(catchError(this.handleErrorMessages.bind(this)));
  }

  public addNote(addNoteRequest: AddNoteRequest): Observable<Note> {
    return this.httpClient
      .post<Note>('note', addNoteRequest)
      .pipe(catchError(this.handleErrorMessages.bind(this)));
  }

  public updateNote(
    id: string,
    updateNoteRequest: UpdateNoteRequest
  ): Observable<Note> {
    return this.httpClient
      .patch(`note/${id}`, updateNoteRequest)
      .pipe(catchError(this.handleErrorMessages.bind(this)));
  }

  public deleteNote(id: string): Observable<string> {
    return this.httpClient
      .delete(`note/${id}`)
      .pipe(catchError(this.handleErrorMessages.bind(this)));
  }

  private handleErrorMessages(
    errorResponse: HttpErrorResponse
  ): Observable<never> {
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
      MISSING_BODY = 'MISSING_BODY',
      NOTE_NOT_FOUND = 'NOTE_NOT_FOUND',
    }

    switch (errorResponseMessage) {
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
