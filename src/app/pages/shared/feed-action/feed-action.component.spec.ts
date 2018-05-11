import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedActionComponent } from './feed-action.component';

describe('FeedActionComponent', () => {
  let component: FeedActionComponent;
  let fixture: ComponentFixture<FeedActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
