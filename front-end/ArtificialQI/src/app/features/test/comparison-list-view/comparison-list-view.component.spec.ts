import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonListViewComponent } from './comparison-list-view.component';

describe('ComparisonListViewComponent', () => {
  let component: ComparisonListViewComponent;
  let fixture: ComponentFixture<ComparisonListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparisonListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
