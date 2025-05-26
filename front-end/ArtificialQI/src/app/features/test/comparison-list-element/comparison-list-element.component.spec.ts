import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonListElementComponent } from './comparison-list-element.component';

describe('ComparisonListElementComponent', () => {
  let component: ComparisonListElementComponent;
  let fixture: ComponentFixture<ComparisonListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonListElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparisonListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
