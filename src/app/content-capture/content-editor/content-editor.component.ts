import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

import { ContentCaptureService } from '../content-capture.service';

const sampleInput = `

[bedu-component type="0" parameter_1="un valor" parameter_2="otro valor"] 
  [content]
    [Officia eu qui incididunt velit adipisicing sit dolor qui ad enim.](http://google.com)
  [/content]
  [content]
    [Pariatur duis aliqua enim irure aliqua ut culpa.](http://google.com)
  [/content]
[/bedu-component]

`;


@Component({
  selector: 'content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.css']
})
export class ContentEditorComponent implements OnInit {

  private contentInput = new FormControl();

  constructor( private contentCaptureService: ContentCaptureService ) { }

  ngOnInit() {

    this.contentInput.setValue( sampleInput );
    this.handleContentChange();

  }


  handleContentChange() {

    let content = this.contentInput.value
    let results = this.contentCaptureService.parseComponents( content )
      
  }



}
