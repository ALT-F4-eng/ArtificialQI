import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonElementComponent } from './comparison-element.component';

describe('ComparisonElementComponent', () => {
  let component: ComparisonElementComponent;
  let fixture: ComponentFixture<ComparisonElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparisonElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
