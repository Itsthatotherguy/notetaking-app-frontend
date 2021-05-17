import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Note } from './store/note.models';
import * as NoteSelectors from './store/note.selectors';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  errorsFetchingNotes$: Observable<string[]>;

  constructor() {}

  ngOnInit(): void {}
}
