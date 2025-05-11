import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatasetListPageComponent } from './dataset-list-page.component';

describe('DatasetListPageComponent', () => {
  let component: DatasetListPageComponent;
  let fixture: ComponentFixture<DatasetListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasetListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasetListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
