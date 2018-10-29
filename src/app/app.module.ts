import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContentCaptureModule } from './content-capture/content-capture.module';
import { ContentComponentsModule } from './content-components/content-components.module';
import { SharedModule } from './shared/shared.module';
import { ComponentBuilderModule } from './component-builder/component-builder.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ContentComponentsModule,
    ComponentBuilderModule,
    ContentCaptureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
