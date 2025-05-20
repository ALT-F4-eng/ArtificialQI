import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeDiagramComponent } from './cake-diagram.component';

describe('CakeDiagramComponent', () => {
  let component: CakeDiagramComponent;
  let fixture: ComponentFixture<CakeDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CakeDiagramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CakeDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
