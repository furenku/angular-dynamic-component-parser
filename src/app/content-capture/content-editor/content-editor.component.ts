import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

import { ComponentParserService } from '../../component-builder/component-parser.service';

const sampleInput = `


# Duis ea reprehenderit est eiusmod.

- a
- b
- c



[test-component
    type="2"
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



# Ad amet consectetur exercitation consectetur mollit id officia veniam dolore eu dolore.

- ab
- bc
- cd



[test-component
    type="1"
    parameter_1="2o componente"
] 
    [content]
        second component
    [/content]
[/test-component]


# Ad amet consectetur exercitation consectetur mollit id officia veniam dolore eu dolore.

- abc
- bcd
- cde

`;


@Component({
  selector: 'content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.css']
})
export class ContentEditorComponent implements OnInit {

  private contentInput = new FormControl();

  constructor( private contentCaptureService: ComponentParserService ) { }

  ngOnInit() {

    this.contentInput.setValue( sampleInput );
    this.handleContentChange();

  }


  handleContentChange() {

    let content = this.contentInput.value
    let results = this.contentCaptureService.parseComponents( content )
      
  }



}
