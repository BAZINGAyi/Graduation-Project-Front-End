import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotQuestionComponent } from './hot-question.component';

describe('HotQuestionComponent', () => {
  let component: HotQuestionComponent;
  let fixture: ComponentFixture<HotQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
