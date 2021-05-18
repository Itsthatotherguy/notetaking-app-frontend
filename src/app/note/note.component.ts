import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as NoteActions from './store/note.actions';
import * as NoteSelectors from './store/note.selectors';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  errors$: Observable<string[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.errors$ = this.store.pipe(select(NoteSelectors.selectErrors));

    this.store.dispatch(NoteActions.loadNotesStart());
  }
}
