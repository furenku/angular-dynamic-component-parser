import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Type1Component } from './type-1-component/type-1-component.component';
import { Type2Component } from './type-2-component/type-2-component.component';
import { Type0Component } from './type-0-component/type-0-component.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Type0Component,
    Type1Component,
    Type2Component
  ],
  exports: [
    Type0Component,
    Type1Component,
    Type2Component
  ],
  entryComponents: [
    Type0Component,
    Type1Component,
    Type2Component
  ]
})
export class ContentComponentsModule { }
