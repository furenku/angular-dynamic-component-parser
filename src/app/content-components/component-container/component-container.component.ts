import { Component, Type } from '@angular/core';

export class ComponentContainer {
  constructor(public component: Type<any>, public data: any) {}
}
