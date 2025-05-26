import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonPageViewComponent } from './comparison-page-view.component';

describe('ComparisonPageViewComponent', () => {
  let component: ComparisonPageViewComponent;
  let fixture: ComponentFixture<ComparisonPageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonPageViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparisonPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
