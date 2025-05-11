import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatasetElementComponent } from './dataset-element.component';

describe('DatasetELementComponent', () => {
  let component: DatasetElementComponent;
  let fixture: ComponentFixture<DatasetElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasetElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasetElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
