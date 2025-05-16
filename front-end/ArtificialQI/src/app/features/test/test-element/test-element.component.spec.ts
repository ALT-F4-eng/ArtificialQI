import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestElementComponent } from './test-element.component';

describe('TestElementComponent', () => {
  let component: TestElementComponent;
  let fixture: ComponentFixture<TestElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
