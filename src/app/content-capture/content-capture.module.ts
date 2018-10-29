import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentEditorComponent } from './content-editor/content-editor.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ContentComponentsModule } from '../content-components/content-components.module';
// import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    // SharedModule,
    ReactiveFormsModule,
    ContentComponentsModule
  ],
  declarations: [ContentEditorComponent],
  exports: [ContentEditorComponent]
})
export class ContentCaptureModule { }
