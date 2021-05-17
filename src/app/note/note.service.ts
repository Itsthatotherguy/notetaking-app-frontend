import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AddNoteRequest } from './dto/add-note.request';
import { Note } from './store/note.models';
import { v4 as uuid } from 'uuid';
import { UpdateNoteRequest } from './dto/update-note.request';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private notes: Note[] = [];

  constructor() {}

  public fetchNotes(): Observable<Note[]> {
    return of(this.notes);
  }

  public addNote(addNoteRequest: AddNoteRequest): Observable<Note> {
    const note: Note = {
      id: uuid(),
      createdAt: new Date(),
      ...addNoteRequest,
    };

    this.notes.push(note);

    return of(note);
  }

  public updateNote(
    id: string,
    updateNoteRequest: UpdateNoteRequest
  ): Observable<Note> {
    let updatedNote;
    this.notes = this.notes.map((note) => {
      if (note.id === id) {
        updatedNote = note;
        return { ...note, ...updateNoteRequest };
      }

      return note;
    });

    return of(updatedNote);
  }

  public deleteNote(id: string): Observable<string> {
    this.notes = this.notes.filter((note) => note.id !== id);

    return of(id);
  }
}
