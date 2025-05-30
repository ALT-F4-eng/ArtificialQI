import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonIndexComponent } from './comparison-index.component';

describe('ComparisonIndexComponent', () => {
  let component: ComparisonIndexComponent;
  let fixture: ComponentFixture<ComparisonIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparisonIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
