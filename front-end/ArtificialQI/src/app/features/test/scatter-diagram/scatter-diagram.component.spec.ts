import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScatterDiagramComponent } from './scatter-diagram.component';

(window as any).Hammer = class {
  constructor() {}
  on(event: any, handler: any) {}
  off(event: any, handler: any) {}
  destroy() {}
  recognize() {}
};


describe('ScatterDiagramComponent', () => {
  let component: ScatterDiagramComponent;
  let fixture: ComponentFixture<ScatterDiagramComponent>;

  beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [ScatterDiagramComponent]
  }).compileComponents();

  fixture = TestBed.createComponent(ScatterDiagramComponent);
  component = fixture.componentInstance;
  component.enableZoom = false;

  fixture.detectChanges();
});


  afterEach(() => {
    if (fixture) {
      fixture.nativeElement.remove();  // Rimuove dal DOM l'elemento
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
