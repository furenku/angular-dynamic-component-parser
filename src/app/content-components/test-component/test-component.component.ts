import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from '../../shared/models/dynamic-component.model';



@Component({
  selector: 'test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements DynamicComponent {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
