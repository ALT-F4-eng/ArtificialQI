import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNameDialogComponent } from './test-name-dialog.component';

describe('TestNameDialogComponent', () => {
  let component: TestNameDialogComponent;
  let fixture: ComponentFixture<TestNameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestNameDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
