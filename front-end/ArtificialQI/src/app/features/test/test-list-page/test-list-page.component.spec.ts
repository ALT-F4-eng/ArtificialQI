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
    { ID: 1, name: 'Test Alpha', lastModified: new Date(), Dataset: '' },
    { ID: 2, name: 'Test Beta', lastModified: new Date(), Dataset: '' },
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
      ID: 1,
      name: 'Test Alpha',
      lastModified: sampleTests[0].lastModified,
      Dataset: '',
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
    expect(component.mockTests.find(t => t.ID === 1)).toBeUndefined();
    expect(component.filteredTests.find(t => t.ID === 1)).toBeUndefined();
  });

  it('should delete a test via confirmation', () => {
    component.mockTests = [...sampleTests];
    component.filteredTests = [...sampleTests];
    component.deletingId = 2;
    component.showConfirm = true;
    mockTestService.deleteTest.mockReturnValue(of({}));

    component.onTestDeleteConfirmed();

    expect(mockTestService.deleteTest).toHaveBeenCalledWith(2);
    expect(component.mockTests.find(t => t.ID === 2)).toBeUndefined();
    expect(component.filteredTests.find(t => t.ID === 2)).toBeUndefined();
    expect(component.showConfirm).toBe(false);
    expect(component.deletingId).toBeUndefined();
  });

  it('should cancel delete confirmation', () => {
    component.showConfirm = true;
    component.deletingId = 99;
    component.confirmMessage = 'some message';

    component.onTestDeleteCanceled();

    expect(component.showConfirm).toBe(false);
    expect(component.deletingId).toBeUndefined();
    expect(component.confirmMessage).toBe('');
  });

  it('should navigate on test load', () => {
    const test = { ID: 1, name: 'Test Alpha', lastModified: new Date(), Dataset: '' };
    component.onTestLoaded(test);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/test'], { state: { test } });
  });
});
