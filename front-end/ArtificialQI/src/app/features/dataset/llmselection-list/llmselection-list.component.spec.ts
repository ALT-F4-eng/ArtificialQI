import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LLMselectionListComponent } from './llmselection-list.component';

describe('LLMselectionListComponent', () => {
  let component: LLMselectionListComponent;
  let fixture: ComponentFixture<LLMselectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LLMselectionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LLMselectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
