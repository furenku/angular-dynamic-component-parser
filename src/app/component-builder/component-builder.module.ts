import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentParserService } from './component-parser.service';

import { ContentPreviewComponent } from './content-preview/content-preview.component';

import { ComponentHostDirective } from './directives/component-host.directive';

@NgModule({
  providers: [
    ComponentParserService
  ],
  imports: [
    CommonModule
  ],
  declarations: [ComponentHostDirective, ContentPreviewComponent],
  exports: [ComponentHostDirective, ContentPreviewComponent]

})
export class ComponentBuilderModule { }
