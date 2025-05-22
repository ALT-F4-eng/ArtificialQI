import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetContentPageComponent } from './dataset-content-page.component';

describe('DatasetContentPageComponent', () => {
  let component: DatasetContentPageComponent;
  let fixture: ComponentFixture<DatasetContentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasetContentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasetContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
