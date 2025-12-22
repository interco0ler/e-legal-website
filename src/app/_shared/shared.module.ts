import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { icons, LucideAngularModule } from 'lucide-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule,
    LucideAngularModule.pick(icons),
  ],
  exports: [
    TranslateModule,
    LucideAngularModule
  ]
})
export class SharedModule { }
