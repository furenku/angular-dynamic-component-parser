let sampleInput = `

[test-component
    type="0"
    parameter_1="un valor"
    parameter_no_value
    parameter_n="ignorar"
    parameter_3
    parameter_4="..."
    parameter_2="otro ! valor distinto"
] 
    [content parameter_1="content parameter 1"  parameter_2="content parameter 2"]
        [Officia eu qui incididunt velit adipisicing sit dolor qui ad enim.](http://google.com)
    [/content]
    [content parameter_2]
        [Pariatur duis aliqua enim irure aliqua ut culpa.](http://google.co)
    [/content]
    [content]
        abc
    [/content]
    [content parameter_3 parameter_4="content parameter 4"]
        123
    [/content]
[/test-component]

`;





const parameterNames = [
    "type",
    "parameter_2", "parameter_3",
    "parameter_no_value",
    "parameter_1",
    "parameter_4", "parameter_5", "parameter_6",
    "parameter_7", "parameter_8", "parameter_9",
];
  


function extractParameters(contentString, startIdentifier) {
    
    let paramObj;

    if(contentString.includes(startIdentifier)) {
    
    if (contentString.startsWith(" ")) {

      contentString = contentString.slice(1)

    }
    
    paramObj = {};


    let foundParameters = parameterNames.filter(
        parameterName => contentString.includes(parameterName)
    );

    foundParameters = foundParameters.sort( sort_found );
    

    foundParameters.forEach( (foundParameter,index) => {

        let parameterStartIndex = contentString.indexOf( foundParameter );
        
        let parameterEndIndex = contentString.length;
        
        // if is not last parameter
        if( index + 1 < foundParameters.length ) {
                        
            parameterEndIndex = contentString.indexOf( foundParameters[ index + 1 ] ); 
                
        } else {
            
            // if is last parameter
            parameterEndIndex = contentString.indexOf("]")
            
            
        }
        
        
        let nextString = contentString.substr(
            parameterStartIndex,
            parameterEndIndex
        );

         
        let parameterValueStartsIndex = nextString.indexOf('="')+2;
    
        if( nextString.indexOf(" ") < nextString.indexOf("=") ) {
            nextString = nextString.substr( 0, nextString.indexOf(" ") );
            console.log( "nextString", nextString );
            parameterValueStartsIndex = -1;
        }


        if( parameterValueStartsIndex > -1 ) {
            

            nextString = nextString.substr( parameterValueStartsIndex, parameterEndIndex )
            let parameterValueEndsIndex = nextString.indexOf('"');
            
            let parameterValue = nextString.substr( 0, parameterValueEndsIndex )
            
            if( foundParameter == "type" ) {
                parameterValue = parseInt( parameterValue );
            }
            if( parameterValue == '' ) {
                parameterValue = true
            }
            paramObj[ foundParameter ] = parameterValue;

        } else {

            // when no value, store true        
            paramObj[ foundParameter ] = true;
        
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



function sort_found(a,b) {

    return sampleInput.indexOf(a) > sampleInput.indexOf(b)

}



function extractContent( componentString ) {

    let endIdentifier = '[/test-component]';
    let startIndex = componentString.indexOf(']')+1;
    let contentString = componentString.substr(
        startIndex,
        componentString.indexOf(endIdentifier)-startIndex
    );

    return contentString; 

}


function getComponentContents( contentString ) {
    
    let contents = [];
    let contentStartIdentifier = '[content';
    let contentStartEndIdentifier = ']';
    let contentEndIdentifier = '[/content]';

    let parsedString = contentString.slice()

    let hasComponents = parsedString.includes(contentStartIdentifier) && 
    parsedString.includes(contentEndIdentifier)

    while( hasComponents ) {
        

        let contentIdentifierWithParameters = parsedString.substr(
            parsedString.indexOf(contentStartIdentifier),
            parsedString.indexOf(contentStartEndIdentifier)
        ) 
        
        let contentParameters = extractParameters( contentIdentifierWithParameters, '[content' )
        
        
        
        
        let identifierLength = contentIdentifierWithParameters.length;
        
        
        let startIndex = parsedString.indexOf(contentStartIdentifier) + identifierLength;

        let content = parsedString.substr(
            startIndex,
            parsedString.indexOf(contentEndIdentifier)-startIndex
        )

        // remove leading and trailing newlines and spaces: 
        content = content.trim()//replace(/^\s+|\s+$/g, '')

        parsedString = parsedString.substr(
            parsedString.indexOf(contentEndIdentifier) + contentEndIdentifier.length
        );

        hasComponents = parsedString.includes(contentStartIdentifier) && 
        parsedString.includes(contentEndIdentifier)
    
        contents.push( { content, ...contentParameters } );

    }


    return contents;
}


console.log(getComponentContents( extractContent(sampleInput) ));
