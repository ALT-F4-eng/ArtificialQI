import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestselectionListComponent } from './testselection-list.component';

describe('TestselectionListComponent', () => {
  let component: TestselectionListComponent;
  let fixture: ComponentFixture<TestselectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestselectionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestselectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
