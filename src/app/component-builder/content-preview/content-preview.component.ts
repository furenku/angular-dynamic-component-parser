import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentParserService } from '../component-parser.service';

import { ComponentFactoryResolver } from '@angular/core';
import { ComponentHostDirective } from '../directives/component-host.directive';
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
    private componentParserService: ComponentParserService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    
    this.componentParserService.getCurrentContents()
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
