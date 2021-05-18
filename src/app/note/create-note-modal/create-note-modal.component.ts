import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Note } from '../store/note.models';
import * as NoteSelectors from '../store/note.selectors';
import * as NoteActions from '../store/note.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddNoteRequest } from '../dto/add-note.request';
import { UpdateNoteRequest } from '../dto/update-note.request';

@Component({
  selector: 'app-create-note-modal',
  templateUrl: 'create-note-modal.component.html',
})
export class CreateNoteModalComponent implements OnInit {
  modalIsVisible$: Observable<boolean>;

  editingMode = false;
  note: Note;
  noteForm: FormGroup;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.modalIsVisible$ = this.store.pipe(
      select(NoteSelectors.selectIsNoteModalOpen)
    );

    this.store.pipe(select(NoteSelectors.selectEditingNote)).subscribe({
      next: (note) => {
        if (!!note) {
          this.note = note;
          this.editingMode = true;
        }

        this.initForm();
      },
    });
  }

  onClickOk(): void {
    if (this.editingMode) {
      const request: UpdateNoteRequest = {
        title: this.noteForm.value.title,
        body: this.noteForm.value.body,
      };

      this.store.dispatch(
        NoteActions.updateNoteStart({ updateNoteRequest: request })
      );
    } else {
      const request: AddNoteRequest = {
        title: this.noteForm.value.title,
        body: this.noteForm.value.body,
      };

      this.store.dispatch(
        NoteActions.addNoteStart({ addNoteRequest: request })
      );
    }

    this.noteForm.reset();
  }

  onClickCancel(): void {
    if (this.editingMode) {
      this.store.dispatch(NoteActions.closeUpdateNoteModal());
    } else {
      this.store.dispatch(NoteActions.closeCreateNoteModal());
    }
  }

  private initForm(): void {
    let noteTitle = '';
    let noteBody = '';

    if (this.editingMode) {
      noteTitle = this.note.title;
      noteBody = this.note.body;
    }

    this.noteForm = new FormGroup({
      title: new FormControl(noteTitle, Validators.required),
      body: new FormControl(noteBody, Validators.required),
    });
  }
}
