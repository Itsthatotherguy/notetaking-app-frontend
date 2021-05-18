import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromNote from './store/note.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NoteEffects } from './store/note.effects';
import { NoteComponent } from './note.component';
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
import { NoteRoutingModule } from './note-routing.module';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { SharedModule } from '../shared/shared.module';
import { LoadingModalComponent } from './loading-modal/loading-modal.component';
import { CreateNoteModalComponent } from './create-note-modal/create-note-modal.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { ActionDropdownComponent } from './note-card-grid/note-card/action-dropdown/action-dropdown.component';

@NgModule({
  declarations: [
    NoteComponent,
    CreateNoteModalComponent,
    NoteCardComponent,
    NoteCardGridComponent,
    LoadingModalComponent,
    PageHeaderComponent,
    ActionDropdownComponent,
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,
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
    NzMessageModule,
    NzModalModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzDropDownModule,
    NzMenuModule,
    NzTypographyModule,
    SharedModule,
  ],
  exports: [NoteComponent],
})
export class NoteModule {}
