import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComparisonPageComponent } from './test-comparison-page.component';

describe('TestComparisonPageComponent', () => {
  let component: TestComparisonPageComponent;
  let fixture: ComponentFixture<TestComparisonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComparisonPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComparisonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
