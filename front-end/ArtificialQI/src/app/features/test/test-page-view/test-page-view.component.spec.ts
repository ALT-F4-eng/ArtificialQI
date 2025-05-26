import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPageViewComponent } from './test-page-view.component';

describe('TestPageViewComponent', () => {
  let component: TestPageViewComponent;
  let fixture: ComponentFixture<TestPageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPageViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
