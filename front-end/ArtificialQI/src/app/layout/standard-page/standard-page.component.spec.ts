import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Routes } from '@angular/router';

import { StandardPageComponent } from './standard-page.component';

@Component({ standalone: true, template: '<div>Home Page</div>' })
class HomePageComponent {}

@Component({ standalone: true, template: '<div>Dataset Page</div>' })
class DatasetPageComponent {}

@Component({ standalone: true, template: '<div>LLM Page</div>' })
class LlmPageComponent {}

@Component({ standalone: true, template: '<div>Test Page</div>' })
class TestPageComponent {}

@Component({ selector: 'app-menu', template: '<nav>Menu</nav>' })
class AppMenuStub {}

@Component({ selector: 'app-footer', template: '<footer>Footer</footer>' })
class AppFooterStub {}

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'dataset', component: DatasetPageComponent },
  { path: 'llm', component: LlmPageComponent },
  { path: 'test', component: TestPageComponent },
];

describe('StandardPageComponent (Jest)', () => {
  let fixture: ComponentFixture<StandardPageComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StandardPageComponent,
        AppMenuStub,
        AppFooterStub,
      ],
      declarations: [
      ],
      providers: [
        provideRouter(routes),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(StandardPageComponent);
    fixture.detectChanges();
    await router.initialNavigation();
  });

  it('should create the component', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should display app-menu', () => {
    const menuElement = fixture.debugElement.query(By.css('app-menu'));
    expect(menuElement).toBeTruthy();
  });

  it('should display app-footer', () => {
    const footerElement = fixture.debugElement.query(By.css('app-footer'));
    expect(footerElement).toBeTruthy();
  });

  it('should navigate to Home', async () => {
    await router.navigate(['']);
    fixture.detectChanges();
    expect(location.path()).toBe('');
  });

  it('should navigate to Dataset', async () => {
    await router.navigate(['/dataset']);
    fixture.detectChanges();
    expect(location.path()).toBe('/dataset');
  });

  it('should navigate to LLM', async () => {
    await router.navigate(['/llm']);
    fixture.detectChanges();
    expect(location.path()).toBe('/llm');
  });

  it('should navigate to Test', async () => {
    await router.navigate(['/test']);
    fixture.detectChanges();
    expect(location.path()).toBe('/test');
  });
});