import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentCaptureService } from '../content-capture.service';

import { ComponentFactoryResolver } from '@angular/core';
import { ComponentHostDirective } from '../../shared/component-host.directive';

@Component({
  selector: 'content-preview',
  templateUrl: './content-preview.component.html',
  styleUrls: ['./content-preview.component.css']
})
export class ContentPreviewComponent implements OnInit {

  @ViewChild(ComponentHostDirective) componentHost: ComponentHostDirective;

  public currentContents : any[];

  constructor(
    private contentCaptureService: ContentCaptureService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    
    this.contentCaptureService.getCurrentContents()
    .subscribe( currentContents => {
    
      this.currentContents = currentContents;
      
    });
       

  }



  loadComponent() {
    // this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    // let adItem = this.ads[this.currentAdIndex];

    // let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    // let viewContainerRef = this.componentHost.viewContainerRef;
    // viewContainerRef.clear();

    // let componentRef = viewContainerRef.createComponent(componentFactory);
    // (<TestComponent>componentRef.instance).data = adItem.data;
  
  }

  

  // get testComponentInfo() {

  // }


}
