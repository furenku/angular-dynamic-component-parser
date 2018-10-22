let sampleInput = `

[test-component
    type="0"
    parameter_1="un valor"
    parameter_no_value="no value"
    parameter_n="ignorar"
    parameter_3="uno final con más palabras"
    parameter_2="otro ! valor distinto"
] 
  [content]
    [Officia eu qui incididunt velit adipisicing sit dolor qui ad enim.](http://google.com)
  [/content]
  [content]
    [Pariatur duis aliqua enim irure aliqua ut culpa.](http://google.com)
  [/content]
[/test-component]

`;



const parameterNames = [
    "type",
    "parameter_1", "parameter_2", "parameter_3",
    "parameter_4", "parameter_5", "parameter_6",
    "parameter_7", "parameter_8", "parameter_9",
    "parameter_no_value",
];
  


function getComponentParameters(contentString) {
    
    let startIdentifier = '[test-component';
    let paramObj;

    if(contentString.includes(startIdentifier)) {
    
    if (contentString.startsWith(" ")) {

      contentString = contentString.slice(1)

    }
    
    paramObj = { data: '', type: 0 };


    ESTO ESTA MAL: DEBERIA GUARDARLOS EN EL ORDEN EN QUE APARECEN:
    let foundParameters = parameterNames.filter(
        parameterName => contentString.includes(parameterName)
    );


    
    foundParameters.forEach( (foundParameter,index) => {

        let parameterStartIndex = contentString.indexOf( foundParameter );
        
        let parameterEndIndex = contentString.length;
        
        // if is not last parameter
        if( index + 1 < foundParameters.length ) {
            
            parameterEndIndex = contentString.indexOf( foundParameters[ index + 1 ] ); 
                
        } else {

            // if is last parameter
            parameterEndIndex = contentString.indexOf("]")
            // console.log("is last", foundParameter, contentString.substr(parameterStartIndex));
            
            
        }
    

        let nextString = contentString.substr(
            parameterStartIndex,
            parameterEndIndex
        );

        let parameterValueStartsIndex = nextString.indexOf('="')+2;
        
        if( parameterValueStartsIndex > -1 ) {

            console.log("no value", foundParameter );
            

            nextString = nextString.substr( parameterValueStartsIndex, parameterEndIndex )
            let parameterValueEndsIndex = nextString.indexOf('"');
            
            let parameterValue = nextString.substr( 0, parameterValueEndsIndex )
            
            if( foundParameter == "type" ) {
                parameterValue = parseInt( parameterValue );
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







console.log(getComponentParameters( sampleInput ));