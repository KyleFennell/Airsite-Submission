import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P5scriptComponent } from './p5script.component';

describe('P5scriptComponent', () => {
  let component: P5scriptComponent;
  let fixture: ComponentFixture<P5scriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P5scriptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P5scriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
