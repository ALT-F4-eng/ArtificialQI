import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { StandardPageComponent } from './standard-page.component';

@Component({ template: '' }) class DummyComponent {}

const routes: Routes = [
  { path: '', component: DummyComponent },
  { path: 'dataset', component: DummyComponent },
  { path: 'llm', component: DummyComponent },
  { path: 'test', component: DummyComponent }
];

describe('StandardPageComponent Routing (Modern)', () => {
  let fixture: ComponentFixture<StandardPageComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardPageComponent],
      declarations: [DummyComponent],
      providers: [provideRouter(routes)]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(StandardPageComponent);
    router.initialNavigation();
  });

  it('should navigate to Home', async () => {
    await router.navigate(['']);
    expect(location.path()).toBe('');
  });

  it('should navigate to Dataset', async () => {
    await router.navigate(['/dataset']);
    expect(location.path()).toBe('/dataset');
  });

  it('should navigate to LLM', async () => {
    await router.navigate(['/llm']);
    expect(location.path()).toBe('/llm');
  });

  it('should navigate to Test', async () => {
    await router.navigate(['/test']);
    expect(location.path()).toBe('/test');
  });

  it('should render the navigation menu (app-menu)', () => {
  const compiled = fixture.nativeElement as HTMLElement;
  const menu = compiled.querySelector('app-menu');
  expect(menu).toBeTruthy();
  });

  it('should render the page footer (app-footer)', () => {
  const compiled = fixture.nativeElement as HTMLElement;
  const footer = compiled.querySelector('app-footer');
  expect(footer).toBeTruthy();
  });
});


