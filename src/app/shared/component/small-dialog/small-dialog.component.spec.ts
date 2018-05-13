import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallDialogComponent } from './small-dialog.component';

describe('SmallDialogComponent', () => {
  let component: SmallDialogComponent;
  let fixture: ComponentFixture<SmallDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
