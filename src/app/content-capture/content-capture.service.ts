import {
  Injectable
} from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { ComponentContainer } from '../content-components/component-container/component-container.component';
import { Type0Component } from '../content-components/type-0-component/type-0-component.component';
import { Type1Component } from '../content-components/type-1-component/type-1-component.component';
import { Type2Component } from '../content-components/type-2-component/type-2-component.component';
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




  getComponentParameters(contentString) : DynamicComponent {
    
    let startIdentifier = '[bedu-component';
    let paramObj;

    if(contentString.includes(startIdentifier)) {
    
    if (contentString.startsWith(" ")) {

      contentString = contentString.slice(1)

    }

    let attrs = contentString.split(" ")

    paramObj = { data: '', type: 0 };

    attrs.forEach(attr => {

      let key = attr.split("=")[0].replace('\'', "");
      let value = attr.split("=")[1]

      if( !!value ) {


        value = value.replace('\'', "").replace(/["']/g, '');
        if (key == 'type') {
          value = parseInt(value)
        }


        if (parameterNames.includes(key)) {

          paramObj[key] = value;

        }

      }


    });


    
    
  } else {
    
    paramObj = {
      // type: -1,
      content: contentString
    }
  }
  
  return paramObj;

  }


  getComponentContents( contentString ) {

    let contents = contentString;

    let parsedContents = [];

    let contentStartIdentifier = '[content]';
    let contentEndIdentifier = '[/content]';

    let hasContents = contents.includes( contentStartIdentifier ) && 
    contents.includes( contentEndIdentifier );
    // while( )

    return parsedContents;

  }


  getComponentContentParameters( contentString ) {
    
    let parsedParameters = [];

    return parsedParameters;
  
  }


  getComponentStrings(content) {

    let results = [];

    let startIdentifier = '[bedu-component';
    let endIdentifier = '[/bedu-component]';

    let hasComponents = content.includes(startIdentifier) && 
    content.includes(endIdentifier);

    let cuttingString = content.slice();

    if( hasComponents ) {

      while ( hasComponents ) {

        let startIndex = cuttingString.indexOf(startIdentifier);
        let endIndex = cuttingString.indexOf(endIdentifier);

        if( startIndex > 0 ) {

          let previousContent = cuttingString.substr(0,startIndex);

          results.push( previousContent );
          
        }

        let substr = cuttingString.substr(startIndex,endIndex);


        // let openIdentifierEndIndex = substr.indexOf(']')
        // let componentString = substr.slice(openIdentifierEndIndex+1, endIndex-2 )

        let componentString = substr.slice(0, endIndex-2 )

        componentString = componentString.replace( endIdentifier, '')

        cuttingString = substr.slice(endIndex +endIdentifier.length )

        results.push(componentString);

        hasComponents = cuttingString.includes(startIdentifier);

        if( ! hasComponents ) {
          results.push( cuttingString );
        }

      }
    }
    else {

      results.push( content );

    }

    return results;

  }



  parseComponents(content) {
    
    let results = this.getComponentStrings(content).map((componentString) => {
      return this.getComponentParameters(componentString)
    });

    
    let resultComponents = results.map( result => {

      console.log(result)
      switch( result.type ) {
        case 0:
          return new ComponentContainer(Type1Component, { ...result });
        case 1:
          return new ComponentContainer(Type2Component, { ...result });
        default: 
          return new ComponentContainer(Type0Component, { ...result });
      }
    });

    this.currentContents.next( resultComponents );

    return resultComponents

  }

  getCurrentContents(): BehaviorSubject<ComponentContainer[]> {
    
    return this.currentContents;

  }


}
