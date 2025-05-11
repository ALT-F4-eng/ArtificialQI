import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatasetListViewComponent } from './dataset-list-view.component';

describe('DatasetListViewComponent', () => {
  let component: DatasetListViewComponent;
  let fixture: ComponentFixture<DatasetListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasetListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasetListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
