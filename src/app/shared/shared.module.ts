import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentHostDirective } from './component-host.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ComponentHostDirective],
  exports: [ComponentHostDirective],
})
export class SharedModule { }
