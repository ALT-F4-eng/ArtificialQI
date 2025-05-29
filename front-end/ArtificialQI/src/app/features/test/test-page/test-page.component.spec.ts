import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestPageComponent } from './test-page.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

/** Mock standalone per CakeDiagram */
@Component({
  selector: 'app-cake-diagram',
  standalone: true,
  template: ''
})
class MockCakeDiagramComponent {}

/** Mock standalone per BarDiagram */
@Component({
  selector: 'app-bar-diagram',
  standalone: true,
  template: ''
})
class MockBarDiagramComponent {}

describe('TestPageComponent', () => {
  let component: TestPageComponent;
  let fixture: ComponentFixture<TestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestPageComponent,
        MockCakeDiagramComponent,
        MockBarDiagramComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
