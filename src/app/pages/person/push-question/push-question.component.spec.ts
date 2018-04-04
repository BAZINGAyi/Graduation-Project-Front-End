import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushQuestionComponent } from './push-question.component';

describe('PushQuestionComponent', () => {
  let component: PushQuestionComponent;
  let fixture: ComponentFixture<PushQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
