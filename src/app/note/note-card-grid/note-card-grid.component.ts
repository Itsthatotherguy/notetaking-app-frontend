import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Note } from '../store/note.models';
import * as NoteSelectors from '../store/note.selectors';

@Component({
  selector: 'app-note-card-grid',
  templateUrl: 'note-card-grid.component.html',
})
export class NoteCardGridComponent implements OnInit {
  notes$: Observable<Note[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.notes$ = this.store.pipe(select(NoteSelectors.selectNotes));
  }
}
