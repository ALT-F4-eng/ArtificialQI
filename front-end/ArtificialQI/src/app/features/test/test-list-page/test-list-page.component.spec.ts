import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestListPageComponent } from './test-list-page.component';
import { TestService } from '../../../core/services/test.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TestDto } from '../../../core/models/test-dto.model';
import { By } from '@angular/platform-browser';

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
      dataset_id: 88,
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
      dataset_id: 89,
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

  it('should fetch and assign test list on init', () => {
    mockTestService.getAllTests.mockReturnValue(of(sampleTests));
    component.ngOnInit();
    expect(mockTestService.getAllTests).toHaveBeenCalled();
    expect(component.mockTests).toEqual(sampleTests);
    expect(component.filteredTests).toEqual(sampleTests);
  });

  it('should render the search bar component', () => {
    fixture.detectChanges();
    const searchBar = fixture.debugElement.query(By.css('app-search-bar'));
    expect(searchBar).toBeTruthy();
  });

  it('should render the test list view component', () => {
    fixture.detectChanges();
    const listView = fixture.debugElement.query(By.css('app-test-list-view'));
    expect(listView).toBeTruthy();
  });

  it('should filter tests with handleSearch()', () => {
    component.mockTests = sampleTests;
    component.handleSearch('Alpha');
    expect(component.filteredTests.length).toBe(1);
    expect(component.filteredTests[0].name).toBe('Test Alpha');
  });

  it('should rename a test and update filtered list', () => {
    const newName = 'Updated Test';
    mockTestService.renameTest.mockReturnValue(of({}));
    component.filteredTests = [...sampleTests];

    component.renameTest(0, newName);

    expect(mockTestService.renameTest).toHaveBeenCalledWith(1, newName);
    expect(component.filteredTests[0].name).toBe(newName);
  });

  it('should set load confirm modal when requesting test load', () => {
    const test = sampleTests[0];
    component.onTestLoadRequest(test);

    expect(component.loadingTestId).toBe(test.id);
    expect(component.showLoadConfirm).toBe(true);
    expect(component.showLoadMessage).toContain(test.name);
  });

  it('should navigate on confirmed test load', () => {
    component.mockTests = sampleTests;
    component.loadingTestId = 2;
    component.onTestLoadConfirmed();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/test', 2], {
      state: { test: sampleTests[1] },
    });
    expect(component.showLoadConfirm).toBe(false);
    expect(component.loadingTestId).toBeUndefined();
  });

  it('should cancel test load confirmation', () => {
    component.loadingTestId = 1;
    component.showLoadConfirm = true;
    component.showLoadMessage = 'test message';
    component.onTestLoadCanceled();

    expect(component.loadingTestId).toBeUndefined();
    expect(component.showLoadConfirm).toBe(false);
    expect(component.showLoadMessage).toBe('');
  });

  it('should show delete confirmation on delete request', () => {
    component.onTestDeleteRequest(1);
    expect(component.deletingid).toBe(1);
    expect(component.showDeleteConfirm).toBe(true);
    expect(component.showDeleteMessage).toContain('eliminare');
  });

  it('should delete test and update list on confirm', () => {
    component.mockTests = [...sampleTests];
    component.filteredTests = [...sampleTests];
    component.deletingid = 1;
    mockTestService.deleteTest.mockReturnValue(of({}));

    component.onTestDeleteConfirmed();

    expect(mockTestService.deleteTest).toHaveBeenCalledWith(1);
    expect(component.mockTests.find(t => t.id === 1)).toBeUndefined();
    expect(component.filteredTests.find(t => t.id === 1)).toBeUndefined();
    expect(component.showDeleteConfirm).toBe(false);
  });

  it('should cancel delete test', () => {
    component.deletingid = 1;
    component.showDeleteConfirm = true;
    component.showDeleteMessage = 'Sei sicuro?';

    component.onTestDeleteCanceled();

    expect(component.deletingid).toBeUndefined();
    expect(component.showDeleteConfirm).toBe(false);
    expect(component.showDeleteMessage).toBe('');
  });

  it('should close message box', () => {
    component.resultMessage = 'ciao';
    component.showMessage = true;
    component.messageType = 'success';

    component.onCloseMessage();

    expect(component.showMessage).toBe(false);
    expect(component.resultMessage).toBe('');
    expect(component.messageType).toBe('error');
  });

  // INTEGRAZIONE: Verifica che test rinominato venga mostrato
  it('should update test name in view after rename (integration)', () => {
    mockTestService.renameTest.mockReturnValue(of({}));
    component.filteredTests = [...sampleTests];

    fixture.detectChanges();
    component.renameTest(1, 'Nuovo Nome');
    fixture.detectChanges();

    expect(component.filteredTests[1].name).toBe('Nuovo Nome');
  });

  // INTEGRAZIONE: Caricamento e navigazione
  it('should navigate to test view after confirming load (integration)', () => {
    component.mockTests = sampleTests;
    component.loadingTestId = 1;
    component.onTestLoadConfirmed();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/test', 1], {
      state: { test: sampleTests[0] },
    });
  });
});
