import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestElementComponent } from './test-element.component';
import { TestDto } from '../../../core/models/test-dto.model';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TestElementComponent', () => {
  let component: TestElementComponent;
  let fixture: ComponentFixture<TestElementComponent>;

  const testMock: TestDto = {
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestElementComponent,
        MatDialogModule, // necessario per openRenameDialog
        NoopAnimationsModule, // evita problemi con animazioni del dialog
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestElementComponent);
    component = fixture.componentInstance;
    component.test = testMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the test name', () => {
    const nameEl = fixture.debugElement.query(By.css('.test-name'));
    expect(nameEl.nativeElement.textContent).toContain('Test Demo');
  });

  it('should display the test id', () => {
    const idEl = fixture.debugElement.query(By.css('.test-id'));
    expect(idEl.nativeElement.textContent).toContain('#123');
  });

  it('should display the last modified date', () => {
    const dateEl = fixture.debugElement.query(By.css('p'));
    expect(dateEl.nativeElement.textContent).toContain('Ultima modifica:');
  });

  it('should display the rename button', () => {
    const renameBtn = fixture.debugElement.queryAll(By.css('button'))[0];
    expect(renameBtn.nativeElement.textContent).toContain('Rinomina');
  });

  it('should display the delete button', () => {
    const deleteBtn = fixture.debugElement.queryAll(By.css('button'))[1];
    expect(deleteBtn.nativeElement.textContent).toContain('Elimina');
  });

  it('should display the load button', () => {
    const loadBtn = fixture.debugElement.queryAll(By.css('button'))[2];
    expect(loadBtn.nativeElement.textContent).toContain('Carica');
  });
});
