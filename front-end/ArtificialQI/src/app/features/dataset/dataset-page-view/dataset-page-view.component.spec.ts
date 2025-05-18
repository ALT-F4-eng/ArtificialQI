import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetPageViewComponent } from './dataset-page-view.component';

describe('DatasetPageViewComponent', () => {
  let component: DatasetPageViewComponent;
  let fixture: ComponentFixture<DatasetPageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasetPageViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasetPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
