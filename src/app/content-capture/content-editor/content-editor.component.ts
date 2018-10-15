import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

import { ContentCaptureService } from '../content-capture.service';

@Component({
  selector: 'content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.css']
})
export class ContentEditorComponent implements OnInit {

  private contentInput = new FormControl('');

  constructor( private contentCaptureService: ContentCaptureService ) { }

  ngOnInit() {
  }


  handleContentChange() {

    let content = this.contentInput.value
    let results = this.contentCaptureService.parseComponents( content )
    
    console.log(results);
    
  }



}
