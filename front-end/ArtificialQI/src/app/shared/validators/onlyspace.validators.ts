import { AbstractControl, ValidationErrors } from '@angular/forms';

export function onlyspaceValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.trim();
  // Se vuoto dopo trim => solo spazi
  if (!value) {
    return { required: true };
  }
  return null;
}