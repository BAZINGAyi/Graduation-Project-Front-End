import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineFeedComponent } from './time-line-feed.component';

describe('TimeLineFeedComponent', () => {
  let component: TimeLineFeedComponent;
  let fixture: ComponentFixture<TimeLineFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeLineFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
