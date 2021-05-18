import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as NoteActions from '../../../store/note.actions';

@Component({
  selector: 'app-note-card-action-dropdown',
  templateUrl: 'action-dropdown.component.html',
})
export class ActionDropdownComponent implements OnInit {
  @Input() noteId: string;

  constructor(private store: Store) {}

  ngOnInit() {}

  onClickEdit(): void {
    this.store.dispatch(NoteActions.openUpdateNoteModal({ id: this.noteId }));
  }

  onClickDelete(): void {
    this.store.dispatch(NoteActions.deleteNoteStart({ id: this.noteId }));
  }
}
