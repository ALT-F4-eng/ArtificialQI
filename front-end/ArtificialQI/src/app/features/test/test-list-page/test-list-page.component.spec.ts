import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TestListPageComponent } from './test-list-page.component';
import { TestService } from '../../../core/services/test.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TestDto } from '../../../core/models/test-dto.model';

const mockTestService = {
  getAllTests: jest.fn(),
  deleteTest: jest.fn(),
  renameTest: jest.fn(),
};

const mockRouter = {
  navigate: jest.fn(),
};

describe('TestListPageComponent (Jest)', () => {
  let component: TestListPageComponent;
  let fixture: ComponentFixture<TestListPageComponent>;

  const sampleTests: TestDto[] = [
    {
    id: 1,
    name: 'Test Alpha',
    llm_name: 'LLM1',
    tmp: true,
    max_page: 10,
    avg_similarity: 0.85,
    exec_date: new Date('2025-05-01'),
    std_dev_similarity: 0.05,
    correct_percentage: 90,
    distribution: [1, 2, 3, 4, 5]
  },
  {
    id: 2,
    name: 'Test Beta',
    llm_name: 'LLM2',
    tmp: false,
    max_page: 12,
    avg_similarity: 0.78,
    exec_date: new Date('2025-06-10'),
    std_dev_similarity: 0.08,
    correct_percentage: 85,
    distribution: [2, 3, 4, 5, 6]
  },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestListPageComponent],
      providers: [
        { provide: TestService, useValue: mockTestService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestListPageComponent);
    component = fixture.componentInstance;

    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should visualize the SearchBarComponent', () => {
    const searchBar = fixture.nativeElement.querySelector('app-search-bar');
    expect(searchBar).toBeTruthy();
  });
  it('should visualize the TestListViewComponent', () => {
    const testListView = fixture.nativeElement.querySelector('app-test-list-view');
    expect(testListView).toBeTruthy();
  });

  it('should fetch all tests on init', () => {
    mockTestService.getAllTests.mockReturnValue(of(sampleTests));

    component.ngOnInit();

    expect(mockTestService.getAllTests).toHaveBeenCalled();
    expect(component.mockTests).toEqual(sampleTests);
    expect(component.filteredTests).toEqual(sampleTests);
  });

  it('should filter tests by search term', () => {
  component.mockTests = sampleTests;
  component.handleSearch('alpha');

  expect(component.filteredTests).toEqual([
    {
      id: 1,
      name: 'Test Alpha',
      exec_date: sampleTests[0].exec_date,
      Dataset: '',
      LLM: '1',
      temp: true,
    }
  ]);
});
  it('should rename a test', () => {
    const renamed = 'Test Renamed';
    const testIndex = 0;
    const original = [...sampleTests];

    component.filteredTests = [...sampleTests];
    mockTestService.renameTest.mockReturnValue(of({}));

    component.renameTest(testIndex, renamed);

    expect(mockTestService.renameTest).toHaveBeenCalledWith(1, renamed);
    expect(component.filteredTests[testIndex].name).toBe(renamed);
  });

  it('should delete a test via testDeleted', () => {
    component.mockTests = [...sampleTests];
    component.filteredTests = [...sampleTests];
    mockTestService.deleteTest.mockReturnValue(of({}));

    component.testDeleted(0);

    expect(mockTestService.deleteTest).toHaveBeenCalledWith(1);
    expect(component.mockTests.find(t => t.id === 1)).toBeUndefined();
    expect(component.filteredTests.find(t => t.id === 1)).toBeUndefined();
  });

  it('should delete a test via confirmation', () => {
    component.mockTests = [...sampleTests];
    component.filteredTests = [...sampleTests];
    component.deletingid = 2;
    component.showDeleteConfirm = true;
    mockTestService.deleteTest.mockReturnValue(of({}));

    component.onTestDeleteConfirmed();

    expect(mockTestService.deleteTest).toHaveBeenCalledWith(2);
    expect(component.mockTests.find(t => t.id === 2)).toBeUndefined();
    expect(component.filteredTests.find(t => t.id === 2)).toBeUndefined();
    expect(component.showDeleteConfirm).toBe(false);
    expect(component.deletingid).toBeUndefined();
  });

  it('should cancel delete confirmation', () => {
    component.showDeleteConfirm = true;
    component.deletingid = 99;
    component.showDeleteMessage = 'some message';

    component.onTestDeleteCanceled();

    expect(component.showDeleteConfirm).toBe(false);
    expect(component.deletingid).toBeUndefined();
    expect(component.showDeleteMessage).toBe('');
  });

  it('should navigate on test load', () => {
    const test = {
    id: 1,
    name: 'Test Alpha',
    llm_name: 'LLM1',
    tmp: true,
    max_page: 10,
    avg_similarity: 0.85,
    exec_date: new Date('2025-05-01'),
    std_dev_similarity: 0.05,
    correct_percentage: 90,
    distribution: [1, 2, 3, 4, 5]
  };

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/test'], { state: { test } });
  });
});
