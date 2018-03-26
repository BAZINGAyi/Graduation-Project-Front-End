import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCommentsComponent } from './comment-comments.component';

describe('CommentCommentsComponent', () => {
  let component: CommentCommentsComponent;
  let fixture: ComponentFixture<CommentCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
