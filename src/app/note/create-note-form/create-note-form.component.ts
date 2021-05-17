import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddNoteRequest } from '../dto/add-note.request';
import * as NoteActions from '../store/note.actions';

@Component({
  selector: 'app-create-note-form',
  templateUrl: 'create-note-form.component.html',
})
export class CreateNoteFormComponent implements OnInit {
  noteForm: FormGroup;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    const request: AddNoteRequest = {
      body: this.noteForm.value.body,
    };

    this.store.dispatch(NoteActions.addNoteStart({ addNoteRequest: request }));

    this.noteForm.reset();
  }

  private initForm(): void {
    this.noteForm = new FormGroup({
      body: new FormControl(null, Validators.required),
    });
  }
}
