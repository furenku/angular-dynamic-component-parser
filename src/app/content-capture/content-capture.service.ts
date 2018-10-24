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
  private inputString: String;
  
  constructor() {
    
    this.currentContents = new BehaviorSubject([]);

  }


    
  extractParameters(contentString, startIdentifier) {

    let paramObj;

    if (contentString.includes(startIdentifier)) {

      if (contentString.startsWith(" ")) {

        contentString = contentString.slice(1)

      }

      paramObj = {};


      let foundParameters = parameterNames.filter(
        parameterName => contentString.includes(parameterName)
      );

      foundParameters = foundParameters.sort((a,b)=>this.sort_found(a,b));


      foundParameters.forEach((foundParameter, index) => {

        let parameterStartIndex = contentString.indexOf(foundParameter);

        let parameterEndIndex = contentString.length;

        // if is not last parameter
        if (index + 1 < foundParameters.length) {

          parameterEndIndex = contentString.indexOf(foundParameters[index + 1]);

        } else {

          // if is last parameter
          parameterEndIndex = contentString.indexOf("]")


        }


        let nextString = contentString.substr(
          parameterStartIndex,
          parameterEndIndex
        );


        let parameterValueStartsIndex = nextString.indexOf('="') + 2;

        if (nextString.indexOf(" ") < nextString.indexOf("=")) {
          nextString = nextString.substr(0, nextString.indexOf(" "));
          
          parameterValueStartsIndex = -1;
        }


        if (parameterValueStartsIndex > -1) {


          nextString = nextString.substr(parameterValueStartsIndex, parameterEndIndex)
          let parameterValueEndsIndex = nextString.indexOf('"');

          let parameterValue = nextString.substr(0, parameterValueEndsIndex)

          if (foundParameter == "type") {
            parameterValue = parseInt(parameterValue);
          }
          
          if (parameterValue == '') {
            parameterValue = true
          }
          paramObj[foundParameter] = parameterValue;

        } else {

          // when no value, store true        
          paramObj[foundParameter] = true;

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



  sort_found(a, b) {

    return this.inputString.indexOf(a) - this.inputString.indexOf(b)

  }



  extractContent(componentString) {

    let endIdentifier = '[/test-component]';
    let startIndex = componentString.indexOf(']') + 1;
    let contentString = componentString.substr(
      startIndex,
      componentString.indexOf(endIdentifier) - startIndex
    );

    return contentString;

  }


  getComponentContents(contentString) {

    let contents = [];
    let contentStartIdentifier = '[content';
    let contentStartEndIdentifier = ']';
    let contentEndIdentifier = '[/content]';

    let parsedString = contentString.slice()

    let hasComponents = parsedString.includes(contentStartIdentifier) &&
      parsedString.includes(contentEndIdentifier)

    while (hasComponents) {


      let contentIdentifierWithParameters = parsedString.substr(
        parsedString.indexOf(contentStartIdentifier),
        parsedString.indexOf(contentStartEndIdentifier)
      )

      let contentParameters = this.extractParameters(contentIdentifierWithParameters, '[content')




      let identifierLength = contentIdentifierWithParameters.length;


      let startIndex = parsedString.indexOf(contentStartIdentifier) + identifierLength;

      let content = parsedString.substr(
        startIndex,
        parsedString.indexOf(contentEndIdentifier) - startIndex
      )

      // remove leading and trailing newlines and spaces: 
      content = content.trim() //replace(/^\s+|\s+$/g, '')

      parsedString = parsedString.substr(
        parsedString.indexOf(contentEndIdentifier) + contentEndIdentifier.length
      );

      hasComponents = parsedString.includes(contentStartIdentifier) &&
        parsedString.includes(contentEndIdentifier)

      contents.push({
        content,
        ...contentParameters
      });

    }


    return contents;
  }


  getComponentStrings(content) {


  let results = [];

  let startIdentifier = '[test-component';
  let endIdentifier = '[/test-component]';

  let cuttingString = content.slice();


  let hasComponents = cuttingString.includes(startIdentifier) &&
    cuttingString.includes(endIdentifier);


  if (hasComponents) {

    while (hasComponents) {

      let startIndex = cuttingString.indexOf(startIdentifier);
      let endIndex = cuttingString.indexOf(endIdentifier) + endIdentifier.length;

      if (startIndex > 0) {

        let previousContent = cuttingString.substr(0, startIndex);
        
        
        if (!!previousContent.trim()) {

          let newComponent = '[test-component type="0"]';
          newComponent += '[content]';
          newComponent += previousContent.trim();
          newComponent += '[/content]';
          newComponent += '[/test-component]';
          
          results.push( newComponent );
        }

      }

      //   let substr = cuttingString.substr(startIndex, endIndex);


      let componentString = cuttingString.substr(startIndex, endIndex);


      cuttingString = cuttingString.slice(endIndex)

      results.push(componentString.trim());



      hasComponents = cuttingString.includes(startIdentifier) &&
        cuttingString.includes(endIdentifier)

      if (!hasComponents) {
        if (!!cuttingString.trim()) {

          let newComponent = '[test-component type="0"]';
          newComponent += '[content]';
          newComponent += cuttingString.trim();
          newComponent += '[/content]';
          newComponent += '[/test-component]';
          
          results.push( newComponent );
  
        }
      }

    }
  } else {

    results.push(content.trim());

  }

  return results;



}




  parseComponents(content) {
    

    this.inputString = content;
    
    // console.log("content",this.getComponentStrings(content));
    
    
    // return null;
    let results = this.getComponentStrings(content).map((componentString,index) => {

      let contents = this.getComponentContents( this.extractContent(componentString) );

      let parameters = this.extractParameters(componentString, '[test-component') 

      return { parameters, contents };

    });

    
    
    let resultComponents = results.map( result => {


      switch( parseInt(result.parameters.type) ) {
        case 1:
        
        return new ComponentContainer(Type1Component, { ...result });
        case 2:
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
