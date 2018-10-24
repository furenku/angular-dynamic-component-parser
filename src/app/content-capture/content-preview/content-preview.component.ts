import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentCaptureService } from '../content-capture.service';

import { ComponentFactoryResolver } from '@angular/core';
import { ComponentHostDirective } from '../../shared/component-host.directive';
import { ComponentContainer } from '../../content-components/component-container/component-container.component';


@Component({
  selector: 'content-preview',
  templateUrl: './content-preview.component.html',
  styleUrls: ['./content-preview.component.css']
})
export class ContentPreviewComponent implements OnInit {

  @ViewChild(ComponentHostDirective) componentHost: ComponentHostDirective;

  public currentContents : ComponentContainer[];


  constructor(
    private contentCaptureService: ContentCaptureService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    
    this.contentCaptureService.getCurrentContents()
    .subscribe( currentContents => {
    
      this.currentContents = currentContents;
      this.loadComponents()

    });
       

  }



  loadComponents() {

    let viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();
    
    this.currentContents.forEach( componentContainer => {

      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentContainer.component);

      let componentRef = viewContainerRef.createComponent(componentFactory);
      
      (componentRef.instance).data = componentContainer.data;
    

    })

    
  }

  


}
