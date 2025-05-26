import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarDiagramComponent } from './bar-diagram.component';

describe('BarDiagramComponent', () => {
  let component: BarDiagramComponent;
  let fixture: ComponentFixture<BarDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarDiagramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
