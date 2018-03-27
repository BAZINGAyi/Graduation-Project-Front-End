import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowQuestionComponent } from './follow-question.component';

describe('FollowQuestionComponent', () => {
  let component: FollowQuestionComponent;
  let fixture: ComponentFixture<FollowQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
