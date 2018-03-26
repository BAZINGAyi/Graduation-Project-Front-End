import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCommentsComponent } from './question-comments.component';

describe('QuestionCommentsComponent', () => {
  let component: QuestionCommentsComponent;
  let fixture: ComponentFixture<QuestionCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
