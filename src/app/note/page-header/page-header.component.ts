import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as NoteActions from '../store/note.actions';

@Component({
  selector: 'app-note-page-header',
  templateUrl: 'page-header.component.html',
  styleUrls: ['page-header.component.css'],
})
export class PageHeaderComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {}

  onClickAdd(): void {
    this.store.dispatch(NoteActions.openCreateNoteModal());
  }
}
