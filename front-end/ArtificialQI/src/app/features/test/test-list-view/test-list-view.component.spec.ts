import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestListViewComponent } from './test-list-view.component';
import { TestDto } from '../../../core/models/test-dto.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-test-element',
  template: ''
})
class MockTestElementComponent {
  @Input() test!: TestDto;
  @Output() rename = new EventEmitter<string>();
  @Output() copyClicked = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() testLoaded = new EventEmitter<TestDto>();
}

describe('TestListViewComponent', () => {
  let component: TestListViewComponent;
  let fixture: ComponentFixture<TestListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestListViewComponent, MockTestElementComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestListViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display test items when tests are present', () => {
    component.tests = [
  {
    ID: 1,
    name: 'Test 1',
    lastModified: new Date(),
    Dataset: 'Dataset A'
  },
  {
    ID: 2,
    name: 'Test 2',
    lastModified: new Date(),
    Dataset: 'Dataset B'
  }
];

    fixture.detectChanges();

    const testElements = fixture.debugElement.queryAll(By.css('app-test-element'));
    expect(testElements.length).toBe(2);
    const emptyMessage = fixture.debugElement.query(By.css('.empty-list'));
    expect(emptyMessage).toBeNull();
  });

  it('should show empty list message when no tests are present', () => {
    component.tests = [];

    fixture.detectChanges();

    const testElements = fixture.debugElement.queryAll(By.css('app-test-element'));
    expect(testElements.length).toBe(0);
    const emptyMessage = fixture.debugElement.query(By.css('.empty-list'));
    expect(emptyMessage).toBeTruthy();
    expect(emptyMessage.nativeElement.textContent).toContain('Nessun test salvato');
  });
});
