import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverFeedsComponent } from './discover-feeds.component';

describe('DiscoverFeedsComponent', () => {
  let component: DiscoverFeedsComponent;
  let fixture: ComponentFixture<DiscoverFeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoverFeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
