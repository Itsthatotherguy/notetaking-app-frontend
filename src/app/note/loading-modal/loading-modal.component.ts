import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as NoteSelectors from '../store/note.selectors';

@Component({
  selector: 'app-loading-modal',
  templateUrl: 'loading-modal.component.html',
  styleUrls: ['loading-modal.component.css'],
})
export class LoadingModalComponent implements OnInit {
  isVisible$: Observable<boolean>;

  modalBodyStyle = {
    padding: '30% 10%',
  };

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isVisible$ = this.store.pipe(select(NoteSelectors.selectIsLoading));
  }
}
