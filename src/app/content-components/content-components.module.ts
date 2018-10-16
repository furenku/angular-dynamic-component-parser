import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponentComponent } from './test-component/test-component.component';
import { ComponentContainerComponent } from './component-container/component-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TestComponentComponent, ComponentContainerComponent],
  exports: [TestComponentComponent],
  entryComponents: [TestComponentComponent]
})
export class ContentComponentsModule { }
