import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Note } from '../store/note.models';
import * as NoteActions from '../store/note.actions';

@Component({
  selector: 'app-note-card',
  templateUrl: 'note-card.component.html',
  styleUrls: ['note-card.component.css'],
})
export class NoteCardComponent {
  @Input() note: Note;

  constructor(private store: Store) {}

  onClickDelete(): void {
    this.store.dispatch(NoteActions.deleteNoteStart({ id: this.note.id }));
  }
}
