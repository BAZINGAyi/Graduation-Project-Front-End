import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCommentQuestionsComponent } from './my-comment-questions.component';

describe('MyCommentQuestionsComponent', () => {
  let component: MyCommentQuestionsComponent;
  let fixture: ComponentFixture<MyCommentQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCommentQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCommentQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
