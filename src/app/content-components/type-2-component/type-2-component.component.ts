import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from '../../shared/models/dynamic-component.model';



@Component({
  selector: 'type-2-component',
  templateUrl: './type-2-component.component.html',
  styleUrls: ['./type-2-component.component.css']
})
export class Type2Component implements DynamicComponent {

  @Input() type: number;
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

  handleClick() {
    alert("click")
  }

}
