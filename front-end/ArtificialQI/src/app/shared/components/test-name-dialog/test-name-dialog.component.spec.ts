import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestNameDialogComponent } from './test-name-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TestNameDialogComponent', () => {
  let component: TestNameDialogComponent;
  let fixture: ComponentFixture<TestNameDialogComponent>;

  const mockDialogRef = {
    close: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestNameDialogComponent, FormsModule, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { name: 'Nome iniziale' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    mockDialogRef.close.mockClear(); // Pulisce gli spy prima di ogni test
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the input label', () => {
    const label = fixture.debugElement.query(By.css('mat-form-field'));
    expect(label).toBeTruthy();
  });

  it('should display the input field with initial value', () => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputEl.value).toBe('Nome iniziale');
  });

  it('should call confirm and close with trimmed name when "Salva" is clicked', () => {
    component.name = '  Nuovo Nome  ';
    fixture.detectChanges();

    const saveButton = fixture.debugElement.queryAll(By.css('button'))[1];
    saveButton.nativeElement.click();

    expect(mockDialogRef.close).toHaveBeenCalledWith('Nuovo Nome');
  });

  it('should display the cancel button', () => {
    const cancelButton = fixture.debugElement.queryAll(By.css('button'))[0];
    expect(cancelButton.nativeElement.textContent).toContain('Annulla');
  });

  it('should close dialog with undefined when cancel is clicked', () => {
    const cancelButton = fixture.debugElement.queryAll(By.css('button'))[0];
    cancelButton.nativeElement.click();

    expect(mockDialogRef.close).toHaveBeenCalledWith(undefined);
  });
});
