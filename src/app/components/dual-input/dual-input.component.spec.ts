import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DualInputComponent } from './dual-input.component';

describe('DualInputComponent', () => {
  let component: DualInputComponent;
  let fixture: ComponentFixture<DualInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DualInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DualInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
