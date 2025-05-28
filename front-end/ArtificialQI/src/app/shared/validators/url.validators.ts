import { AbstractControl, ValidationErrors } from '@angular/forms';

export function urlValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null; // Se vuoto, non invalida ci pensa Validators.required
  }

  const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;

  if (!urlPattern.test(value)) {
    return { invalidUrl: true };
  }

  return null; // valido
}