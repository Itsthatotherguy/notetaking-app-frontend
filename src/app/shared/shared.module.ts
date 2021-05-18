import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { ErrorBoxComponent } from './error-box/error-box.component';

@NgModule({
  declarations: [ErrorBoxComponent],
  imports: [CommonModule, NzAlertModule],
  exports: [ErrorBoxComponent],
})
export class SharedModule {}
