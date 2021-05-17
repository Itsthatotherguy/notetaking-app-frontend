import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromNote from './store/note.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NoteEffects } from './store/note.effects';
import { NoteComponent } from './note.component';
import { CreateNoteFormComponent } from './create-note-form/create-note-form.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteCardComponent } from './note-card-grid/note-card/note-card.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NoteCardGridComponent } from './note-card-grid/note-card-grid.component';

@NgModule({
  declarations: [
    NoteComponent,
    CreateNoteFormComponent,
    NoteCardComponent,
    NoteCardGridComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromNote.noteFeatureKey, fromNote.reducer),
    EffectsModule.forFeature([NoteEffects]),
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzDividerModule,
    NzCardModule,
    NzEmptyModule,
    NzIconModule,
    NzSpinModule,
  ],
  exports: [NoteComponent],
})
export class NoteModule {}
