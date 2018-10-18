import {
  Injectable
} from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { ComponentContainer } from '../content-components/component-container/component-container.component';
import { TestComponentComponent } from '../content-components/test-component/test-component.component';
import { DynamicComponent } from '../shared/models/dynamic-component.model';


const parameterNames = [
  "type",
  "parameter_1", "parameter_2", "parameter_3",
  "parameter_4", "parameter_5", "parameter_6",
  "parameter_7", "parameter_8", "parameter_9",
];



@Injectable({
  providedIn: 'root'
})
export class ContentCaptureService {

  public currentContents: BehaviorSubject<ComponentContainer[]>;
  
  
  constructor() {
    
    this.currentContents = new BehaviorSubject([]);

  }




  getComponentParameters(attrsStr) : DynamicComponent {
    
    if (attrsStr.startsWith(" ")) {

      attrsStr = attrsStr.slice(1)

    }

    let attrs = attrsStr.split(" ")

    let paramObj = { data: '', type: 0 };

    attrs.forEach(attr => {

      let key = attr.split("=")[0].replace('\'', "");
      let value = attr.split("=")[1]

      value = value.replace('\'', "").replace(/["']/g, '');
      if (key == 'type') {
        value = parseInt(value)
      }


      if (parameterNames.includes(key)) {

        paramObj[key] = value;

      }


    });


    return paramObj;

  }


  getComponentStrings(content) {

    let results = [];
    let startIdentifier = '[test-component';

    let hasComponents = content.includes(startIdentifier);

    let cuttingString = content.slice();

    while (hasComponents) {

      let startIndex = cuttingString.indexOf(startIdentifier)
      let substr = cuttingString.substr(startIndex);


      let endIndex = substr.indexOf(']')

      let componentString = substr.slice(0, endIndex + 1)
      componentString = componentString.replace(startIdentifier, '')
      componentString = componentString.replace(']', '')

      cuttingString = substr.slice(endIndex + 1)

      results.push(componentString);

      hasComponents = cuttingString.includes(startIdentifier);

    }

    return results;

  }



  parseComponents(content) {

    let results = this.getComponentStrings(content).map((componentString) => {
      return this.getComponentParameters(componentString)
    });

    let resultComponents = results.map( result => {
      console.log( result.type );
      return new ComponentContainer(TestComponentComponent, {title: 'Título', content: 'Reprehenderit tempor excepteur amet mollit.'})  
    });

    this.currentContents.next( resultComponents );

    return resultComponents

  }

  getCurrentContents(): BehaviorSubject<ComponentContainer[]> {
    
    return this.currentContents;

  }


}
