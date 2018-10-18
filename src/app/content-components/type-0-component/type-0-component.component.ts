import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from '../../shared/models/dynamic-component.model';



@Component({
  selector: 'type-0-component',
  templateUrl: './type-0-component.component.html',
  styleUrls: ['./type-0-component.component.css']
})
export class Type0Component implements DynamicComponent {

  @Input() type: number;
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

  handleClick() {
    alert("click")
  }

}
