import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from '../../shared/models/dynamic-component.model';



@Component({
  selector: 'type-1-component',
  templateUrl: './type-1-component.component.html',
  styleUrls: ['./type-1-component.component.css']
})
export class Type1Component implements DynamicComponent {

  @Input() type: number;
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

  handleClick() {
    alert("click")
  }

}
