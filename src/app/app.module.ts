import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContentCaptureModule } from './content-capture/content-capture.module';
import { ContentComponentsModule } from './content-components/content-components.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ContentComponentsModule,
    ContentCaptureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
