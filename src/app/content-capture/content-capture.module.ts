import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentEditorComponent } from './content-editor/content-editor.component';
import { ContentPreviewComponent } from './content-preview/content-preview.component';
import { ContentCaptureService } from './content-capture.service';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  providers: [
    ContentCaptureService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [ContentEditorComponent, ContentPreviewComponent],
  exports: [ContentEditorComponent, ContentPreviewComponent]
})
export class ContentCaptureModule { }
