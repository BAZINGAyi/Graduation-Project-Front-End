import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicFeedsComponent } from './topic-feeds.component';

describe('TopicFeedsComponent', () => {
  let component: TopicFeedsComponent;
  let fixture: ComponentFixture<TopicFeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicFeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
