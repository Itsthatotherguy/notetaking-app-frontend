import { NgModule } from '@angular/core';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';

@NgModule({
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class CoreModule {}
