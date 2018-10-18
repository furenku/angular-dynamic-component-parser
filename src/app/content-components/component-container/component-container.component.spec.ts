import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentContainer } from './component-container.component';

describe('ComponentContainer', () => {
  let component: ComponentContainer;
  let fixture: ComponentFixture<ComponentContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
